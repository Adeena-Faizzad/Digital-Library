import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import bookRoutes from "./routes/book.route.js";

import path from "path";

import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/books", bookRoutes)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get("*", (req, res) => res.sendFile(path.join(__dirname, '/client/dist/index.html')))

app.listen(PORT, ()=>{
    connectDB();
    console.log("Server is up and running...")
})
