import express from "express";
import { createBlog, deleteBlog, getBlogs, getSpecificBlog, updateBlog } from "../controller/blog.js";
import { upload } from "../middleware/multer.js";
const blogRoutes = express.Router()

blogRoutes.get('/',getBlogs)
blogRoutes.post('/create',upload.fields([{ name: "img", maxCount: 1 }]),createBlog)
blogRoutes.delete('/:id',deleteBlog)
blogRoutes.put('/:id',updateBlog)
blogRoutes.get('/:id',getSpecificBlog)

export default blogRoutes