// /middlewares/error-handler.middleware.js

export default function (err, req, res, next) {
  console.log(err , err.name , err.message)
  if (err.name.includes("ValidationError")) {
    return res.status(400).json({ errorMessage: `${err.message} 형식이 올바르지 않습니다` });

  } else if (err.name === "priceValidation"){
    return res.status(400).json({ errorMessage: "메뉴 가격은 0보다 작을수 없습니다." });
  }else if (err.name === "notExist"){
    
    return res.status(404).json({ message: `존재하지 않는 ${err.message}입니다`});
    
  }else if (err.name === "passwordNotMatch") {
    return res.status(401).json({
      message: "비밀번호가 일치하지 않습니다.",
    });
  } else if (err.name === "No_permission"){
    return res.status(401).json({
      message: "사장님만 사용할 수 있는 API입니다"
    })
  }

  return res.status(500).json({ message: "서버에서 응답이 없습니다." });
}
