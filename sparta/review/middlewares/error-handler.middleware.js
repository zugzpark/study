// /middlewares/error-handler.middleware.js

export default function (err, req, res, next) {
  console.log(err , err.name)
  if (err.name.includes("ValidationError")) {
    return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다" });

  } else if (err.name === "CastError") {
    return res.status(404).json({ message: "존재하지 않는 리뷰입니다." });

  } else if (err.name === "notExistComment"){
    return res.status(404).json({ message: "댓글 내용을 입력해주세요." });
    
  }else if (err.name === "passwordNotMatch") {
    return res.status(401).json({
      message: "비밀번호가 일치하지 않습니다.",
    });
  }

  return res.status(500).json({ message: "서버에서 응답이 없습니다." });
}
