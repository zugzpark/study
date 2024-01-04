import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import logMiddleware from './middlewares/logMiddleware.js';

const app = express();
const PORT = 3000;

app.use(cookieParser()); // cookie를 req.cookies에 등록하는 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(logMiddleware);
app.use(logMiddleware);
app.use('/api', routes);

app.get("/get", (req,res) => {
  const cookies = req.cookies;
  return res.status(200).json({cookie : cookies})
})
app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});

export default app;
