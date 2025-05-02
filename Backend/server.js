import express from "express";
import cors from "cors";  // Import cors
import connectDB from "./config/db.js"; // Import DB connection
import questionRoutes from "./routes/questions.js"; // Use import instead of require

const app = express(); // Declare app before using it

connectDB(); // Connect to MongoDB

app.use(cors()); // Enable CORS for all routes (allows requests from any origin)

app.use(express.json()); // Middleware to parse JSON
app.use('/api/questions', questionRoutes); // Setup routes for questions

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
