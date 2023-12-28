import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://admin12:admin1221nimda@express-mongo.xotdd9a.mongodb.net/?retryWrites=true&w=majority",

      {
        dbName: "member",
      },
    )
    .then(() => console.log("MongoDB 연결에 성공하였습니다."))
    .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB 연결 에러", err);
});

export default connect;
