import express from "express";
import categoriesRouter from "./routes/categories.router.js";
import menuRouter from "./routes/menu.router.js";
import ErrorHandlerMiddleware from "./middlewares/error-handler.middleware.js";
import signUpRouter from "./routes/signup.js";
import loginRouter from "./routes/login.js";
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Node.js Lv4 박성진");
});

app.use("/api", [categoriesRouter, menuRouter, signUpRouter]);
app.use("/api-sign-in", [loginRouter]);

app.get("/api-sign-in", (req, res) => {
  const cookies = req.cookies;
  return res.status(200).json({ cookie: cookies });
});
app.use(ErrorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(PORT, "success");
});
