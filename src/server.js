import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import emailRoutes from "./routes/emailRoutes.js"; // make sure path is correct

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));



app.use("/api/email", emailRoutes); 

// Root route
app.get("/", (req, res) => {
  res.send("Mail Sender Backend Running 🚀");
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
