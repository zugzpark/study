import express from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma/index.js';
import authLoginUserMiddleware from '../middlewares/authLoginUserMiddleware.js';

const router = express.Router();

const loginSchema = Joi.object({
  nickname: Joi.string().required(),
  password: Joi.string().required(),
});

router.post('/', authLoginUserMiddleware, async (req, res) => {
  try {
    console.log(`login`)
    const { nickname, password } = await loginSchema.validateAsync(req.body);

    console.log(nickname,password)
    
    const user = await prisma.users.findFirst({
      where: { nickname, password },
    });

    if (!user) {
      return res.status(412).json({
        errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
      });
    }

    let expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60); // expires의 시간을 현재 시간의 60분 후로 설정

    const token = jwt.sign({ userId: user.userId }, 'Secret Key');
    console.log(`token>>> `, token)
    res.cookie(
      'fillInTheBlankCookie',
      `Bearer ${token}`,
      { expires: expires } // cookie의 만료시간 설정
    );


    
    return res.status(200).json({ token });
  } catch (error) {
    console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: '로그인에 실패하였습니다.',
    });
  }
});

export default router;
