import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Pusher from "pusher";
import postModel from "./postModel.js";

// app config
const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(cors());

// DB config
const { MONGO_URL } = process.env;
console.log(MONGO_URL);
mongoose.connect(MONGO_URL, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
	console.log("DB Connected");
});

// API routes
app.get("/", (req, res) => res.status(200).send("Hello world"));

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
