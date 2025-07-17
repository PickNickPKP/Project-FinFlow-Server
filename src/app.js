import express from "express";
import authRoute from "./routes/auth.route.js";
import notFoundMiddleware from "./middlewares/not-Found.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/overview", (req, res) => {
  res.json({ msg: "overview" });
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
