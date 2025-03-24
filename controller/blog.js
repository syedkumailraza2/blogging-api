import Blog from "../model/blog.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const createBlog = async (req,res)=>{
    try {
        const { title, content, hashtag, links } = req.body
        if(!title){
            res.status(400).json({message:"title is required"})
        }
        if(!content){
            res.status(400).json({message:"content is required"})
        }
        if(!hashtag){
            res.status(400).json({message:"hashtag is required"})
        }
        if(!links){
            res.status(400).json({message:"link is required"})
        }

        if (!Array.isArray(hashtag)) {
            return res.status(400).json({ message: "Hashtag must be an array" });
        }

        

        const imageBuff = req.files?.img?.[0]?.buffer;
        if (!imageBuff) {
            return res.status(400).json({ message: "image is required" });
        }

        const image = await uploadOnCloudinary(imageBuff)
        if (!image) {
            return res.status(400).json({ message: "Failed to upload image" });
        }

        const newBlog = Blog({
            title,
            content,
            hashtag,
            links,
            img: image.secure_url
        })

        await newBlog.save()
        res.status(201).json({ message: "Blog added successfully", blog: newBlog });

    } catch (error) {
        console.error("Error adding blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { createBlog }