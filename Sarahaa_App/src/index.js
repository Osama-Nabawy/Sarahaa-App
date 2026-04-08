import express from "express";
import { connectDB } from "./DB/connection.js";
import { authRouter } from "./moldules/auth/auth.controller.js";
import { userRouter } from "./moldules/user/user.controller.js";
import cors from "cors";
import { connectRedis } from "./DB/redis.connection.js";
import { commentRouter } from "./moldules/comment/comment.controller.js";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

const app = express();
const port = 3000;

app.use(helmet());
connectDB();
connectRedis();

app.use(cors("*"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(express.json());

app.use("/auth", authRouter);
app.use("/comment", commentRouter);
app.use("/user", userRouter);

app.use((error, req, res, next) => {
  if (error.message == "jwt expired") {
    return res
      .status(401)
      .json({ message: "Token Expired please login again", success: false });
  }
  return res.status(error.cause || 500).json({
    message: error.message,
    details: error.details || null,
    stack: error.stack,
    success: false,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
