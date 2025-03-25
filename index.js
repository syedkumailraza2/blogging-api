import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import blogRoutes from './routes/blog.js';
import connectDB from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ Fix: Correct CORS setup
app.use(cors({
    origin: 'https://blogingwebsite.vercel.app', // Allow only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Handle preflight requests properly
app.options('*', (req, res) => {
    res.sendStatus(200);
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/blog', blogRoutes);

// Connect to DB
connectDB();

// Test API
app.get('/', (req, res) => {
    res.send("Server is Running successfully");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
