import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import AdminAuthRouter from "./controller/AdminAuthController.js";
import ConsignmentRouter from "./controller/ConsignmentController.js";
import publicRouter from "./controller/publicRoutes.js";
import ReceiptRouter from "./controller/ReceipientController.js";
import QuotationRouter from "./controller/QuatationController.js";


const app = express();
app.set('trust proxy', 1);
const port = process.env.PORT || 4000;

connectDB();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allowed origins
const allowedOrigins = [
  "http://localhost:4000",
  "http://127.0.0.1:5500",
  "https://gosen-innovative-tech-production.up.railway.app",
  "https://gosen-innovative-technology.pro",
  "https://www.gosen-innovative-technology.pro"
];

// Middleware
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

// Serve HTML/CSS/JS (same folder)
app.use(express.static(__dirname));

app.use("/api/admin/auth", AdminAuthRouter);
app.use("/api/admin/consignments", ConsignmentRouter);
app.use("/api/admin/receipts", ReceiptRouter);
app.use("/api/admin/quotations", QuotationRouter);
app.use("/api", publicRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API Is Working");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
