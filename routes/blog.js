import express from "express";
import { createBlog, deleteBlog } from "../controller/blog.js";
import { upload } from "../middleware/multer.js";
const blogRoutes = express.Router()

blogRoutes.post('/create',upload.fields([{ name: "img", maxCount: 1 }]),createBlog)
blogRoutes.delete('/:id',deleteBlog)
export default blogRoutes