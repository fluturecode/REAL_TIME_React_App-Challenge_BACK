import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Pusher from "pusher";
import postModel from "./postModel.js";

// app config
const app = express();
const port = process.env.PORT || 8080;

// set up Pusher connection
const pusher = new Pusher({
	appId: "1076988",
	key: "1ad8f300734d63cac07f",
	secret: "51a504d5d9d4ca3e433b",
	cluster: "us2",
	usetls: true,
});

// pusher.trigger('my-channel', 'my-event', {
//   'message': 'hello world'
// });

// middleware
app.use(express.json());
// Handles headers (security)
app.use(cors());

// DB config
const { MONGO_URL } = process.env;
// console.log(MONGO_URL);
mongoose.connect(MONGO_URL, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
	console.log("DB Connected");
	// create watcher, and whenever something changes, trigger callback
	const changeStream = mongoose.connection.collection("posts").watch();

	changeStream.on("change", (change) => {
		console.log("Change triggered on Pusher...");
		console.log(change);
		console.log("End of Change");
	});
});

// API routes
app.get("/", (req, res) => res.status(200).send("First API Endpoint"));

app.post("/upload", (req, res) => {
	const body = req.body;

	postModel.create(body, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

app.get("/sync", (req, res) => {
	postModel.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
