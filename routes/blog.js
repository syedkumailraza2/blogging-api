import express from "express";
import { createBlog } from "../controller/blog.js";
import { upload } from "../middleware/multer.js";
const blogRoutes = express.Router()

blogRoutes.post('/create',upload.fields([{ name: "img", maxCount: 1 }]),createBlog)
//blogRoutes.delete('/:id',deleteSubject)
export default blogRoutes