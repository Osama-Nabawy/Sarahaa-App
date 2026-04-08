import express from "express"
import { connectDB } from "./DB/connection.js";
import { authRouter } from "./moldules/auth/auth.controller.js";
import { userRouter } from "./moldules/user/user.controller.js";
const app = express();
const port = 3000;


connectDB()


app.use(express.json())

app.use("/auth", authRouter)

app.use("/user", userRouter)

app.use((error, req, res, next) => {
  if (error.message == "jwt expired") {
    return res.status(401).json({ message: "Token Expired please login again", success: false });
  }
  return res
    .status(error.cause || 500)
    .json({
      message: error.message,
      details: error.details || null,
      stack: error.stack,
      success: false,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})