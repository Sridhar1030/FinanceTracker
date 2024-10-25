import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import monthlyLimitRoutes from "./routes/MonthlyLimit.route.js";
import expenseRouter from "./routes/expense.router.js";
import inputRouter from "./routes/Input.router.js";

const app = express();

// Middleware
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*", // Fallback to allow all origins if not set
    })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON and URL-encoded data limit
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files
app.use(express.static("public"));

// Serve frontend from "dist" directory
const buildPath = path.join(__dirname, "../../FrontEnd/dist");
if (!fs.existsSync(buildPath)) {
    console.error("Build directory not found:", buildPath);
}
app.use(express.static(buildPath));

// Routes
app.use("/api/addInput", inputRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/auth", userRoutes);
app.use("/api/monthly", monthlyLimitRoutes);

// Catch-all route to serve index.html
app.get("/*", (req, res) => {
    const indexPath = path.join(buildPath, "index.html");

    // Check if index.html exists before serving
    if (!fs.existsSync(indexPath)) {
        console.error("index.html file not found at", indexPath);
        return res.status(404).send("index.html not found");
    }

    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error("Error serving index.html:", err);
            res.status(500).send(err);
        }
    });
});

// Export app for server.js
export default app;
