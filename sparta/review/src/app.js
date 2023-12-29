import express from 'express';
import commentsRouter from './routes/comments.router.js';
import reviewsRouter from './routes/reviews.router.js';
import ErrorHandlerMiddleware from '../middlewares/error-handler.middleware.js'
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res) => {
    res.send('Node.js Lv2 박성진')
})

app.use("/api", [reviewsRouter,commentsRouter]);

app.use(ErrorHandlerMiddleware);

app.listen(PORT, () => {
    console.log(PORT , 'success')
})