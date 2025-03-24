import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from "dotenv";
import blogRoutes from './routes/blog.js';
import connectDB from './config/database.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 8000
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Student Routes
app.use('/blog',blogRoutes)

connectDB()

app.get('/',(req,res)=>{
    res.send("Server is Running successfully")
})

app.listen(PORT, ()=>{
    console.log('server is running at ',PORT);
    
})

