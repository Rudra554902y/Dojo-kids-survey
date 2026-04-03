import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import surveyRouter from "./routes/surveyRoutes.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);
const mongoUri = process.env.MONGODB_URI;
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
};

if (!mongoUri) {
  throw new Error("MONGODB_URI is required.");
}

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api", surveyRouter);

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri);
    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

void startServer();
