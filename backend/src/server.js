import express from "express";
import tasksRoutes from "./routes/tasksRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // load biến môi trường từ file .env

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json()); // middleware để parse JSON body
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api/tasks", tasksRoutes);

//connect được mới lắng nghe trên cổng
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server bắt đầu trên công 5001");
  });
});
