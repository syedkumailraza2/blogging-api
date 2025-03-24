import mongoose, { model } from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    img: { type: String, required: true },
    hashtag: { type: String, required: true },
    links: { type: String, required: true },
})

const Blog = mongoose.model('Blog',blogSchema)
export default Blog