// /middlewares/error-handler.middleware.js

export default function (err, req, res, next) {
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ errorMessage: "데이터 형식이 올바르지 않습니다" });
  } else if (err.name === "CastError") {
    return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
  } else if (err.name === "passwordNotMatch") {
    return res.status(401).json({
      message: "상품을 " + err.method + "할 권한이 존재하지 않습니다",
    });
  }

  return res.status(500).json({ message: "서버에서 응답이 없습니다." });
}
