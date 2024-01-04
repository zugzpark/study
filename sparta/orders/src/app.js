import express from 'express';
import categoriesRouter from './routes/categories.router.js';
import menuRouter from './routes/menu.router.js';
import ErrorHandlerMiddleware from '../middlewares/error-handler.middleware.js'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res) => {
    res.send('Node.js Lv3 박성진')
})

app.use("/api", [categoriesRouter,menuRouter]);

app.use(ErrorHandlerMiddleware);

app.listen(PORT, () => {
    console.log(PORT , 'success')
})