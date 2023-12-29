import express from "express";
import { prisma } from "../utils/prisma/index.js";
import Joi from "joi";

const router = express.Router();

/**6. 댓글 작성 API
    - 댓글 내용, 작성자명, 비밀번호를 **request**에서 전달받기
    - 댓글 내용을 비워둔 채 API를 호출하면 “댓글 내용을 입력해주세요” 메시지 반환하기
*/
router.post("/reviews/:reviewId/comments", async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    let review = await prisma.reviews.findFirst({ where: { id: +reviewId } });
    console.log(review);
    if (!review) throw { name: "CastError" };

    //유효성 검사
    const body = Joi.object({
      content: Joi.string().min(1),
      author: Joi.string().min(1),
      password: Joi.string().min(1),
    });
    const validation = body.validate(req.body);
    if (validation.error) throw { name: "ValidationError" };

    //데이터 삽입
    const { content, author, password } = req.body;
    const param = Number(reviewId);

    await prisma.comments.create({
      data: {
        reviewId: param,
        content,
        author,
        password,
      },
    });

    return res.status(201).json({ message: "댓글을 등록 하였습니다." });
  } catch (error) {
    next(error);
  }
});

/**7. 댓글 목록 조회 API
    - 조회하는 리뷰에 작성된 모든 댓글을 목록 형식으로 조회하기
    - 작성 날짜 기준으로 내림차순(최신순) 정렬하기
*/
router.get("/reviews/:reviewId/comments", async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    const review = await prisma.reviews.findUnique({
      where: { id: +reviewId },
    });
    console.log(`>>>>>`, review);
    if (!review) throw { name: "CastError" };
    const comment = await prisma.comments.findMany({
      where: {
        reviewId: +reviewId,
      },
      select: {
        id: true,
        reviewId: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(comment);

    return res.status(200).json({ data: comment });
  } catch (error) {
    next(error);
  }
});

/**8. 댓글 수정 API
    - 댓글 내용, 비밀번호를 **request**에서 전달받기
    - 댓글 내용을 비워둔 채 API를 호출하면 “댓글 내용을 입력해주세요” 메시지 반환하기
*/
router.put("/reviews/:reviewId/comments/:commentId", async (req, res, next) => {
  try {
    const { reviewId, commentId } = req.params;
    //유효성 검증
    const body = Joi.object({
      content: Joi.string().min(1),
      password: Joi.string().min(1),
    });
    const validation = body.validate(req.body);
    if (validation.error) throw { name: "ValidationError" };

    const { content, password } = req.body;

    //리뷰가 존재하는지
    const review = await prisma.reviews.findUnique({
      where: { id: +reviewId },
    });

    //리뷰가 존재하지 않으면 에러 리턴
    if (!review) throw { name: "CastError" };
    console.log("review >>> ", review);

    //댓글이 존재 하는지
    const comment = await prisma.comments.findUnique({
      select: { password: true },
      where: { reviewId: +reviewId, id: +commentId },
    });

    //댓글이 존재하지 않으면 에러 리턴
    if (!comment) throw { name: "notExistComment" };

    console.log("comment >>> ", comment);

    console.log(review.password, "<>", password);
    //비밀번호가 일치하면 true 일치하지않으면 에러 리턴
    if (comment.password == password) {
      await prisma.comments.update({
        data: {
          content: content,
          updatedAt: new Date().toJSON(),
        },
        where: { id: +commentId },
      });

      return res.status(200).json({ message: "댓글을 수정하였습니다." });
    } else {
      throw { name: "passwordNotMatch" };
    }
  } catch (error) {
    next(error);
  }
});

/**9. 댓글 삭제 API
    - 비밀번호를 비교하여, 동일할 때만 댓글이 **삭제**되게 하기
 * 
 */
router.delete(
  "/reviews/:reviewId/comments/:commentId",
  async (req, res, next) => {
    try {
      const { reviewId, commentId } = req.params;
      //유효성 검증
      const body = Joi.object({
        content: Joi.string().min(1),
        password: Joi.string().min(1),
      });
      const validation = body.validate(req.body);
      if (validation.error) throw { name: "ValidationError" };

      const { content, password } = req.body;

      //리뷰가 존재하는지
      const review = await prisma.reviews.findUnique({
        where: { id: +reviewId },
      });

      //리뷰가 존재하지 않으면 에러 리턴
      if (!review) throw { name: "CastError" };
      console.log("review >>> ", review);

      //댓글이 존재 하는지
      const comment = await prisma.comments.findUnique({
        select: { password: true },
        where: { reviewId: +reviewId, id: +commentId },
      });

      //댓글이 존재하지 않으면 에러 리턴
      if (!comment) throw { name: "notExistComment" };

      console.log("comment >>> ", comment);

      console.log(review.password, "<>", password);
      //비밀번호가 일치하면 true 일치하지않으면 에러 리턴
      if (comment.password == password) {
        await prisma.comments.delete({
          where: { id: +commentId },
        });

        return res.status(200).json({ message: "댓글을 삭제하였습니다." });
      } else {
        throw { name: "passwordNotMatch" };
      }
    } catch (error) {
      next(error);
    }
  }
);

export default router;
