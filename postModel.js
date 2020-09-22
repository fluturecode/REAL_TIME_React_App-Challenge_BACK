import mongoose from "mongoose";

const instance = mongoose.Schema({
	caption: String,
	user: String,
	image: String,
	comments: [],
});

// Export as this collection
export default mongoose.model("posts", instance);
