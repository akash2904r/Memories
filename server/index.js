import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

mongoose.connect(`${process.env.MONGO_URL}${process.env.DB_NAME}`)
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((error) => console.log(error));