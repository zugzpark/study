import express from 'express';
import Joi from 'joi';
import { prisma } from '../utils/prisma/index.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { parseModelToFlatObject } from '../utils/object.helper.js';

const router = express.Router();

const RE_COMMENT = /^[\s\S]{1,100}$/; // 댓글 정규 표현식

const commentSchema = Joi.object({
  comment: Joi.string().pattern(RE_COMMENT).required(),
});

// 댓글 목록 조회
router.get('/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await prisma.comments.findMany({
      where: { PostId: +postId },
      select: {
        commentId: true,
        UserId: true,
        comment: true,
        createdAt: true,
        updatedAt: true,
        User: {
          select: {
            nickname: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({
      data: comments.map((comment) => parseModelToFlatObject(comment)),
    });
  } catch (error) {
    console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: '댓글 조회에 실패하였습니다.',
    });
  }
});

// 댓글 생성
router.post('/:postId/comments', authMiddleware, async (req, res) => {
  try {
    const resultSchema = commentSchema.validate(req.body);
    if (resultSchema.error) {
      return res.status(412).json({
        errorMessage: '데이터 형식이 올바르지 않습니다.',
      });
    }

    const { postId } = req.params;
    const { comment } = resultSchema.value;
    const { userId } = res.locals.user;

    const post = await prisma.posts.findFirst({
      where: { postId: +postId },
    });
    if (!post) {
      return res.status(404).json({
        errorMessage: '게시글이 존재하지 않습니다.',
      });
    }

    await prisma.comments.create({
      data: { PostId: +postId, UserId: +userId, comment },
    });

    return res.status(201).json({ message: '댓글을 작성하였습니다.' });
  } catch (error) {
    console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: '댓글 작성에 실패하였습니다.',
    });
  }
});

// 댓글 수정
router.put('/:postId/comments/:commentId', authMiddleware, async (req, res) => {
  try {
    const resultSchema = commentSchema.validate(req.body);
    if (resultSchema.error) {
      return res.status(412).json({
        errorMessage: '데이터 형식이 올바르지 않습니다.',
      });
    }

    const { postId, commentId } = req.params;
    const { comment } = resultSchema.value;
    const { userId } = res.locals.user;

    const isExistComment = await prisma.comments.findUnique({
      where: { commentId: +commentId },
    });
    if (!isExistComment) {
      return res.status(404).json({
        errorMessage: '댓글이 존재하지 않습니다.',
      });
    }

    await prisma.comments.update({
      where: { commentId: +commentId, PostId: +postId, UserId: +userId },
      data: { comment },
    });

    return res.status(200).json({ message: '댓글을 수정하였습니다.' });
  } catch (error) {
    console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: '댓글 수정에 실패하였습니다.',
    });
  }
});

// 댓글 삭제
router.delete(
  '/:postId/comments/:commentId',
  authMiddleware,
  async (req, res) => {
    try {
      const { postId, commentId } = req.params;
      const { userId } = res.locals.user;

      const isExistComment = await prisma.comments.findUnique({
        where: { commentId: +commentId },
      });
      if (!isExistComment) {
        return res.status(404).json({
          errorMessage: '댓글이 존재하지 않습니다.',
        });
      }

      await prisma.comments.delete({
        where: { commentId: +commentId, PostId: +postId, UserId: +userId },
      });

      return res.status(200).json({ message: '댓글을 삭제하였습니다.' });
    } catch (error) {
      console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).json({
        errorMessage: '댓글 삭제에 실패하였습니다.',
      });
    }
  }
);

export default router;
