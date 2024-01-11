import express from "express";
import categoriesRouter from "./routes/categories.router.js";
import menuRouter from "./routes/menu.router.js";
import ErrorHandlerMiddleware from "./middlewares/error-handler.middleware.js";
import signUpRouter from "./routes/signup.js";
import loginRouter from "./routes/login.js";
import ordersRouter from "./routes/orders.js"
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Node.js Lv5 박성진");
});

app.use("/api", [categoriesRouter, menuRouter, signUpRouter]);
app.use("/api-sign-in", [loginRouter]);
app.use("/api/orders", [ordersRouter]);

app.use(ErrorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(PORT, "success");
});
