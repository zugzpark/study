import express from 'express';
import Joi from 'joi';
import { prisma } from '../utils/prisma/index.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { isRegexMatch } from '../utils/regex.helper.js';
import { parseModelToFlatObject } from '../utils/object.helper.js';

const router = express.Router();

const RE_TITLE = /^[a-zA-Z0-9\s\S]{1,40}$/; // 게시글 제목 정규 표현식
const RE_HTML_ERROR = /<[\s\S]*?>/; // 게시글 HTML 에러 정규 표현식
const RE_CONTENT = /^[\s\S]{1,3000}$/; // 게시글 내용 정규 표현식

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

// 모든 게시글 조회
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.posts.findMany({
      select: {
        postId: true,
        UserId: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        User: {
          select: {
            nickname: true,
          },
        },
        _count: {
          select: {
            Likes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({
      data: posts.map((post) => parseModelToFlatObject(post)),
    });
  } catch (error) {
    console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: '게시글 조회에 실패하였습니다.',
    });
  }
});

// 개시글 생성
router.post('/', authMiddleware, async (req, res) => {
  try {
    const resultSchema = postSchema.validate(req.body);
    if (resultSchema.error) {
      return res.status(412).json({
        errorMessage: '데이터 형식이 올바르지 않습니다.',
      });
    }

    const { title, content } = resultSchema.value;
    const { userId } = res.locals.user;

    if (!isRegexMatch(title, RE_TITLE) || isRegexMatch(title, RE_HTML_ERROR)) {
      return res.status(412).json({
        errorMessage: '게시글 제목의 형식이 일치하지 않습니다.',
      });
    }
    if (!isRegexMatch(content, RE_CONTENT)) {
      return res.status(412).json({
        errorMessage: '게시글 내용의 형식이 일치하지 않습니다.',
      });
    }

    await prisma.posts.create({
      data: {
        UserId: userId,
        title,
        content,
      },
    });

    return res.status(201).json({ message: '게시글 작성에 성공하였습니다.' });
  } catch (error) {
    console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: '게시글 작성에 실패하였습니다.',
    });
  }
});

// 게시글 상세 조회
router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await prisma.posts.findFirst({
      where: { postId: +postId },
      select: {
        postId: true,
        UserId: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        User: {
          select: {
            nickname: true,
          },
        },
        _count: {
          select: {
            Likes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({ data: parseModelToFlatObject(post) });
  } catch (error) {
    console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: '게시글 조회에 실패하였습니다.',
    });
  }
});

// 게시글 수정
router.put('/:postId', authMiddleware, async (req, res) => {
  try {
    const resultSchema = postSchema.validate(req.body);
    if (resultSchema.error) {
      return res.status(412).json({
        errorMessage: '데이터 형식이 올바르지 않습니다.',
      });
    }

    const { postId } = req.params;
    const { title, content } = resultSchema.value;
    const { userId } = res.locals.user;

    if (!isRegexMatch(title, RE_TITLE) || isRegexMatch(title, RE_HTML_ERROR)) {
      return res.status(412).json({
        errorMessage: '게시글 제목의 형식이 일치하지 않습니다.',
      });
    }
    if (!isRegexMatch(content, RE_CONTENT)) {
      return res.status(412).json({
        errorMessage: '게시글 내용의 형식이 일치하지 않습니다.',
      });
    }

    const post = await prisma.posts.findUnique({
      where: { postId: +postId },
    });

    if (!post) {
      return res.status(404).json({
        errorMessage: '게시글이 존재하지 않습니다.',
      });
    }

    await prisma.posts.update({
      where: { postId: +postId, UserId: +userId },
      data: { title, content },
    });

    return res.status(200).json({ message: '게시글을 수정하였습니다.' });
  } catch (error) {
    console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: '게시글 수정에 실패하였습니다.',
    });
  }
});

// 게시글 삭제
router.delete('/:postId', authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = res.locals.user;

    const post = await prisma.posts.findUnique({
      where: { postId: +postId },
    });
    if (!post) {
      return res.status(404).json({
        errorMessage: '게시글이 존재하지 않습니다.',
      });
    }
    if (post.UserId !== userId) {
      return res.status(401).json({
        errorMessage: '게시글을 삭제할 권한이 없습니다.',
      });
    }

    await prisma.posts.delete({
      where: { postId: +postId },
    });

    return res.status(201).json({ message: '게시글을 삭제하였습니다.' });
  } catch (error) {
    console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
    console.error(error);
    return res.status(400).json({
      errorMessage: '게시글 삭제에 실패하였습니다.',
    });
  }
});

export default router;
