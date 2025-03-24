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

const deleteBlog = async (req,res)=>{
    try {
        const blogId = req.params.id
        const blogExist = await Blog.findById(blogId)

        if(!blogExist){
            return res.status(400).json({ message: "Blog does'nt exist" });
        }

        await Blog.deleteOne({_id:blogId})
        res.status(200).json({ message: "Blog deleted successfully"});

    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateBlog = async (req,res)=>{
    try {
        const blogId = req.params.id
        const blogExist = await Blog.findById(blogId)

        if(!blogExist){
            return res.status(400).json({ message: "Blog does'nt exist" });
        }

        if(req.files?.img?.[0]?.buffer) {
            const uploadedImage = await uploadOnCloudinary(req.files.img[0].buffer);
            if (uploadedImage) Blog.img = uploadedImage.secure_image;
        }

        const updatedb = await Blog.findOneAndUpdate(
            { _id: blogId },
            { $set: req.body },
            { new: true } //return updated document
        )

        res.status(200).json({ message:"Blog updated Successfully", blog: updatedb })
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { createBlog, deleteBlog, updateBlog }