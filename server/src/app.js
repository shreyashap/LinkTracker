import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./config.js";

import userRouter from "./routes/user.route.js";
import linkRouter from "./routes/link.route.js";
import linkRedirectRouter from "./routes/linkRedirect.route.js";

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN_NAME,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/link", linkRouter);
app.use("/", linkRedirectRouter);

export { app };
