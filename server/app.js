// app.js
import express from "express";
import cors from "cors";
import routes from "./routes/reviews.js"

// make a new express app
const app = express()

// 1. Middleware
app.use(cors());
app.use(express.json())

// 2. Routes
app.use('/api/v1/reviews', routes)

export { app }