import express from "express";
import cors from "cors";
import mongoose from "mongoosse";
import Pusher from "pusher";

// app config
const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(cors());

// API routes
app.get("/", (req, res) => res.status(200).send("Hello world"));

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
