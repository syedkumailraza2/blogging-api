import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from "dotenv";
import blogRoutes from './routes/blog.js';
import connectDB from './config/database.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 8000
app.use(cors({
    origin: 'https://blogingwebsite.vercel.app', // Allow only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
  app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://blogingwebsite.vercel.app/"); // Replace * with your frontend URL for security
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

//Student Routes
app.use('/blog',blogRoutes)

connectDB()

app.get('/',(req,res)=>{
    res.send("Server is Running successfully")
})

app.listen(PORT, ()=>{
    console.log('server is running at ',PORT);
    
})

