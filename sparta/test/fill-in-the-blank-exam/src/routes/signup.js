import express from 'express';
import Joi from 'joi';
import { prisma } from '../utils/prisma/index.js';
import { isRegexMatch } from '../utils/regex.helper.js';
import authLoginUserMiddleware from '../middlewares/authLoginUserMiddleware.js';

const router = express.Router();

const re_nickname = /^[a-zA-Z0-9]{3,10}$/;
const re_password = /^[a-zA-Z0-9]{4,30}$/;

const userSchema = Joi.object({
  nickname: Joi.string().pattern(re_nickname).required(),
  password: Joi.string().pattern(re_password).required(),
  confirm: Joi.valid(Joi.ref('password')).required(),
});

router.post('/', authLoginUserMiddleware, async (req, res) => {
  try {
    // 닉네임의 시작과 끝이 a-zA-Z0-9글자로 3 ~ 10 단어로 구성되어야 한다.
    const { nickname, password, confirm } = await userSchema.validateAsync(
      req.body
    );

    if (password !== confirm) {
      return res.status(412).json({
        errorMessage: '패스워드가 일치하지 않습니다.',
      });
    }
    if (!isRegexMatch(nickname, re_nickname)) {
      return res.status(412).json({
        errorMessage: '닉네임의 형식이 일치하지 않습니다.',
      });
    }
    if (!isRegexMatch(password, re_password)) {
      return res.status(412).json({
        errorMessage: '패스워드 형식이 일치하지 않습니다.',
      });
    }
    if (isRegexMatch(password, nickname)) {
      return res.status(412).json({
        errorMessage: '패스워드에 닉네임이 포함되어 있습니다.',
      });
    }

    const user = await prisma.users.findFirst({
      where: { nickname },
      select: { userId: true },
    });

    if (user) {
      return res.status(412).json({
        errorMessage: '중복된 닉네임입니다.',
      });
    }
    await prisma.users.create({
      data: {
        nickname,
        password,
      },
    });
    console.log(`${nickname} 님이 가입하셨습니다.`);

    return res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
  } catch (error) {
    console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
    });
  }
});

export default router;
