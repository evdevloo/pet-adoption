// app.js
import express from "express";
import cors from "cors";
import routes from "./routes/reviews.js"
import morgan from "morgan";

// make a new express app
const app = express()

// 1. Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// 2. Routes
app.use('/', routes)

export { app }