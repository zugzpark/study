const express = require('express');
const PostsRouter = require('./routers/posts.router');
const { connect } = require('./models/index')
const dotenv = require('dotenv')

dotenv.config()

const app = express();
const PORT = 3000;

connect(process.env.MONGODB_URI, process.env.DB_NAME);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use([PostsRouter]);

app.listen(PORT, () => {
  console.log(`Server listen ${PORT}`)
});

