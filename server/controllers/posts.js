import mongoose from 'mongoose';

import Posts from '../models/post.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Posts.find();

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ error });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    
    const newPost =  new Posts(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ error });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;

    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with the specified id');

    const updatedPost = await Posts.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No post with the specified id');

    await Posts.deleteOne({ _id: id });

    res.json({ message: 'Post deleted successfully...' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No post with the specified id');

    const post = await Posts.findById(id);
    
    const updatePost = await Posts.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatePost);
}
