const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables
const cors = require("cors");

const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(
  cors({
    origin: "https://track-finance-app.netlify.app/",
    credentials: true,
  })
);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World! The app is running and connected to MongoDB.");
});



const authRoutes = require("./src/routes/auth.route");
app.use("/auth", authRoutes);

const TrackTransactionRoutes = require("./src/routes/TrackTransaction.route");
app.use("/api", TrackTransactionRoutes);

const BudgetTrackerRoute = require("./src/routes/BudgetTracker.route");
app.use("/api", BudgetTrackerRoute);

const TransactionListRoutes = require("./src/routes/TransactionList.route");
app.use("/api", TransactionListRoutes );

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
