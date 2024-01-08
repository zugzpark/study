import express from "express";
import Joi from "joi";
import { prisma } from "../utils/prisma/index.js";
import bcrypt from "bcrypt";

const router = express.Router();

//- 닉네임은 `최소 3자 이상, 15자 이하, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)`로 구성하기
const re_nickname = /^[a-zA-Z0-9]{3,15}$/;
//- 비밀번호는 `최소 8자 이상, 20자 이하, 닉네임과 같은 값이 포함된 경우 회원가입에 실패`로 구성하기
const re_password = /^[a-zA-Z0-9]{8,20}$/;

/**
 * 1. 회원가입 API (소비자/사장님)
    - 사용자명, 비밀번호, 사용자 타입을 **request**에서 전달받기
    - 닉네임은 `최소 3자 이상, 15자 이하, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)`로 구성하기
    - 비밀번호는 `최소 8자 이상, 20자 이하, 닉네임과 같은 값이 포함된 경우 회원가입에 실패`로 구성하기
    - 이미 가입된 닉네임을 전달한 경우, "중복된 닉네임입니다." 메시지 반환하기
    - **사용자 타입**은 **소비자(`CUSTOMER`)**와 **사장님(`OWNER`)** 타입이 존재합니다.
    - 회원가입 시 기본 타입은 **소비자(`CUSTOMER`)**입니다.
 */
const userSchema = Joi.object({
  nickname: Joi.string().pattern(re_nickname).required(),
  password: Joi.string().pattern(re_password).required(),
  //**사용자 타입**은 **소비자(`CUSTOMER`)**와 **사장님(`OWNER`)** 타입이 존재합니다.
  usertype: Joi.string().valid("CUSTOMER", "OWNER"),
});

router.post("/sign-up", async (req, res,next) => {
  try {
    console.log(`회원가입`, req.body)
    const resultSchema = userSchema.validate(req.body);
    
    //아이디, 비밀번호 유효성 검증
    if(resultSchema.error && resultSchema.error.message.includes("nickname")) throw { name : "ValidationError" ,message:"닉네임"}
    if(resultSchema.error && resultSchema.error.message.includes("password")) throw { name : "ValidationError" ,message:"비밀번호"}
    
    const {nickname, password, usertype} = resultSchema.value
    if(password.includes(nickname)) throw { name : "ValidationError" ,message:"비밀번호"}
    
    console.log("회원가입 >>> ", nickname, password, usertype);
    
    const user = await prisma.users.findFirst({
      where: { nickname },
      select: { id: true },
    });

    if (user) {
      return res.status(412).json({
        errorMessage: "중복된 닉네임입니다.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.users.create({
      data: {
        nickname,
        password: hashedPassword,
        usertype
      },
    });
    console.log(`${nickname} 님이 가입하셨습니다.`);

    return res.status(201).json({ message: "회원 가입에 성공하였습니다." });
  } catch (error) {
    next(error)
  }
});

export default router;
