import express from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma/index.js";
import bcrypt from "bcrypt";

const router = express.Router();

const loginSchema = Joi.object({
  nickname: Joi.string().required(),
  password: Joi.string().required(),
});

/**
 * 2. 로그인 API (소비자/사장님)
    - 사용자명, 비밀번호를 **request**에서 전달받기
    - 일치하지 않는 정보로 로그인 API를 호출시, “닉네임 또는 패스워드를 확인해주세요.” 메시지 반환하기
    - 로그인 성공 시, 사용자의 정보를 JWT로 인코딩하고, **Bearer 타입의 Cookie**로 클라이언트에게 전달하기
  * 
 */
router.post("/", async (req, res, next) => {
  try {
    
    const resultSchema = loginSchema.validate(req.body);

    //데이터 형식 에러 리턴
    if (resultSchema.error) throw { name: "ValidationError",message:"데이터" };

    const { nickname, password } = resultSchema.value;

    //아이디 확인
    const user = await prisma.users.findFirst({
      select: { id:true, nickname: true, password: true, usertype: true },
      where: { nickname },
    });
    //console.log(user , user.nickname , user.id)
    if (!user) {
      throw { name: "notExist", message: "닉네임" };
    } else if (!(await bcrypt.compare(password, user.password))) {
      throw { name: "passwordNotMatch" };
    }

    let expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60); // expires의 시간을 현재 시간의 60분 후로 설정

    
    //토큰 발급
    
    const token = jwt.sign({ userId: user.id }, 'Secret_orders_Key');
    
    console.log(`token>>> `, token);

    res.cookie(
      'authorization',
      `Bearer ${token}`,
      { expires: expires } // cookie의 만료시간 설정
    );

    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
