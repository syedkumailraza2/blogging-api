import express from "express";
import { createBlog, deleteBlog, updateBlog } from "../controller/blog.js";
import { upload } from "../middleware/multer.js";
const blogRoutes = express.Router()

blogRoutes.post('/create',upload.fields([{ name: "img", maxCount: 1 }]),createBlog)
blogRoutes.delete('/:id',deleteBlog)
blogRoutes.put('/:id',updateBlog)

export default blogRoutes