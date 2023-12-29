import express from "express";
import { prisma } from "../utils/prisma/index.js";
import Joi from "joi";
const router = express.Router();

/**
 * 1. 리뷰 작성 API
    - 책 제목, 리뷰 제목, 리뷰 내용, 별점, 작성자명, 비밀번호를 **request**에서 전달받기
    - 리뷰 별점은 최소 1점 ~ 최대 10점까지 등록 가능합니다
 */
router.post("/reviews", async (req, res, next) => {
  try {
    //유효성 검사
    const body = Joi.object({
      bookTitle: Joi.string().min(1),
      title: Joi.string().min(1),
      starRating: Joi.string().min(1),
      content: Joi.string().min(1),
      author: Joi.string().min(1),
      password: Joi.string().min(1),
    });
    const validation = body.validate(req.body);
    if (validation.error) throw { name: "ValidationError" };

    //데이터 삽입
    const { bookTitle, title, starRating, content, author, password } =
      req.body;

    const review = await prisma.reviews.create({
      data: {
        bookTitle,
        title,
        starRating,
        content,
        author,
        password,
      },
    });

    return res
      .status(201)
      .json({ data: review, message: "책 리뷰를 등록 하였습니다." });
  } catch (error) {
    next(error);
  }
});

/**
 * 2. 리뷰 목록 조회 API
    - 책 제목, 리뷰 제목, 별점, 작성자명, 작성 날짜를 조회하기
    - 리뷰 목록은 작성 날짜를 기준으로 **내림차순(최신순)** 정렬하기
*/
router.get("/reviews", async (req, res) => {
  const review = await prisma.reviews.findMany({
    select: {
      id: true,
      bookTitle: true,
      title: true,
      author: true,
      starRating: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json({ data: review });
});

/**
3. 리뷰 상세 조회 API
    - 책 제목, 리뷰 제목, 리뷰 내용, 별점, 작성자명, 작성 날짜를 조회하기
*/
router.get("/reviews/:reviewId", async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    const review = await prisma.reviews.findFirst({
      where: { id: +reviewId },
      select: {
        id: true,
        bookTitle: true,
        title: true,
        author: true,
        starRating: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({ data: review });
  } catch (error) {
    next({ name: "ValidationError" });
  }
});

/**
4. 리뷰 수정 API
    - 책 제목, 리뷰 제목, 리뷰 내용, 별점을 **request**에서 전달받기
    - 비밀번호 일치 여부를 확인한 후, 동일할 때만 리뷰가 **수정**되게 하기
    - 선택한 리뷰가 존재하지 않을 경우, “존재하지 않는 리뷰입니다." 메시지 반환하기
*/
router.put("/reviews/:reviewId", async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    //유효성 검증
    const body = Joi.object({
      bookTitle: Joi.string().min(1),
      title: Joi.string().min(1),
      starRating: Joi.string().min(1),
      content: Joi.string().min(1),
      password: Joi.string().min(1),
    });
    const validation = body.validate(req.body);
    if (validation.error) throw { name: "ValidationError" };

    const { bookTitle, title, starRating, content, password } = req.body;

    //리뷰가 존재하는지
    const review = await prisma.Reviews.findUnique({
      select: { password: true },
      where: { id: +reviewId },
    });
    //리뷰가 존재하지 않으면 에러 리턴
    if (!review) throw { name: "CastError" };

    //비밀번호가 일치하면 true 일치하지않으면 에러 리턴
    if (review.password == password) {
      await prisma.reviews.update({
        data: {
          bookTitle: bookTitle,
          title: title,
          starRating: starRating,
          content: content,
          password: password,
          updatedAt: new Date().toJSON(),
        },
        where: { id: +reviewId },
      });
      return res.status(200).json({ message: "책 리뷰를 수정하였습니다." });
    } else {
      throw { name: "passwordNotMatch" };
    }
  } catch (error) {
    next(error);
  }
});

/**5. 리뷰 삭제 API
    - 비밀번호 일치 여부를 확인한 후, 동일할 때만 리뷰가 **삭제**되게 하기
    - 선택한 리뷰가 존재하지 않을 경우, “존재하지 않는 리뷰입니다." 메시지 반환하기
*/
router.delete("/reviews/:reviewId", async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    //유효성 검증
    const body = Joi.object({
      password: Joi.string().min(1),
    });
    const validation = body.validate(req.body);
    if (validation.error) throw { name: "ValidationError" };

    const { password } = req.body;

    //리뷰 존재 여부 검증
    const review = await prisma.reviews.findUnique({
      select: { password: true },
      where: { id: +reviewId },
    });

    //리뷰가 존재하지 않으면 에러 리턴
    if (!review) throw { name: "CastError" };

    //비밀번호가 일치하면 true 일치하지않으면 에러 리턴
    if (review.password == password) {
      await prisma.reviews.delete({
        where: { id: +reviewId },
      });

      return res.status(200).json({ message: "책 리뷰를 삭제하였습니다." });
    } else {
      throw { name: "passwordNotMatch" };
    }
  } catch (error) {
    next(error);
  }
});

export default router;
