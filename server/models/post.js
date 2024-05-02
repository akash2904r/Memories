import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    creator: String,
    name: String,
    title: String,
    message: String,
    tags: [String],
    imgURL: String,
    likes: {
        type: [String],
        default: [],
    },
    comments: {
        type: [Object],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const postModel = mongoose.model('posts', postSchema);

export default postModel;