import express from "express";

import { getPost, getPosts, createPost, updatePost, deletePost, likePost, commentPost, getPostsBySearch } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.patch('/:id/comment', auth, commentPost);

export default router;