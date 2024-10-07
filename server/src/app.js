import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    // "https://scroll-hack-4glf.vercel.app"
    origin: ["*"],
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    preflightContinue: false,
    credentials: true
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello")
})

import userRouter from "./routes/user.routes.js"
import adminRouter from "./routes/admin.routes.js"
import lectureRoutes from "./routes/course.routes.js"

app.use("/api/v1/user", userRouter)
app.use("/api/v1", adminRouter)
app.use("/api/v1", lectureRoutes)


export { app };
