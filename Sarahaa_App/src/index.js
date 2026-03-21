import express from "express"
import { connectDB } from "./DB/connection.js";
import { authRouter } from "./moldules/auth/auth.controller.js";
const app = express();
const port = 3000;


connectDB()


app.use(express.json())

app.use("/auth", authRouter)



app.use((error, req, res, next) => {
  return res
    .status(error.cause || 500)
    .json({ message: error.message, stack: error.stack, success: false });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})