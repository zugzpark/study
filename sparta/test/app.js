import express from "express";
import connect from "./schemas/index.js";
import membersRouter from "./routes/member.router.js"

const app = express();
const PORT = 3000;

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

app.get("/", (req, res) => {

  res.send("5조 박성진 주특기 1주차");
});
app.use("/", [router, membersRouter]);



app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
