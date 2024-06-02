import express from "express";
import authRoute from "./src/routes/authRoute";

//Init The App
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);

// Running the Server
const port: number = 2000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
