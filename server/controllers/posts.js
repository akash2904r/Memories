import mongoose from 'mongoose';

import Posts from '../models/post.js';

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await Posts.countDocuments({});

        const posts = await Posts.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ error });
    }
};

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i');

        const posts = await Posts.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ] });

        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Posts.findById(id);

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
    
    const newPost =  new Posts({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ error });
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;

    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with the specified id');

    const updatedPost = await Posts.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No post with the specified id');

    await Posts.deleteOne({ _id: id });

    res.json({ message: 'Post deleted successfully...' });
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: "Unathenticated" });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with the specified id');

    const post = await Posts.findById(id);

    const index = post.likes.findIndex(id => id == String(req.userId));

    if(index == -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter(id => id != String(req.userId));
    }
    
    const updatePost = await Posts.findByIdAndUpdate(id, post, { new: true });

    res.json(updatePost);
};

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const commentDetails = req.body;

    const post = await Posts.findById(id);

    post.comments.push(commentDetails);

    const updatedPost = await Posts.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};