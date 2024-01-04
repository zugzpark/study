import express from "express";
import { prisma } from "../utils/prisma/index.js";
import Joi from "joi";
const router = express.Router();

/**
 * 1. 카테고리 등록 API
    - 카테고리 이름을 **request**에서 전달받기
    - 새롭게 등록된 카테고리는 **가장 마지막 순서**로 설정됩니다.
    */

router.post("/categories", async (req, res, next) => {
  try {
    console.log("카테고리 등록 ", req.body);

    //유효성 검증
    const body = Joi.object({
      name: Joi.string().min(1),
    });
    const validation = body.validate(req.body);

    //유효성 에러 리턴
    if (validation.error) throw { name: "ValidationError" };

    //orders 의 최대값 조회
    let max = await prisma.categories.aggregate({ _max: { orders: true } });
    max._max ? (max._max.orders += 1) : (max = 1);

    await prisma.categories.create({
      data: {
        name: req.body.name,
        orders: max._max.orders,
        updateAt: new Date(),
      },
    });
    return res.status(200).json({ message: "카테고리를 등록하였습니다" });
  } catch (error) {
    next(error);
  }
});

/*
2. 카테고리 조회 API
    - 등록된 모든 카테고리의 카테고리 이름, 순서를 조회하기
    - 조회된 카테고리는 지정된 순서대로 정렬됩니다.
*/
router.get("/categories", async (req, res, next) => {
  console.log(`카테고리 조회 `);
  try {
    const categories = await prisma.categories.findMany({
      orderBy: { orders: "asc" },
    });
    return res.status(200).json({ data: categories });
  } catch (error) {
    next(error);
  }
});

/*
3. 카테고리 수정 API
    - 카테고리 이름, 순서를 **request**에서 전달받기
    - 선택한 카테고리가 존재하지 않을 경우, “존재하지 않는 카테고리입니다." 메시지 반환하기
*/
router.patch("/categories/:categoryId", async (req, res, next) => {
  try {
    //유효성 검증
    const { categoryId } = req.params;
    const body = Joi.object({
      name: Joi.string().min(1),
      orders: Joi.string().min(1),
      categoryId: Joi.string().min(1),
    });

    const validation = body.validate(req.body);
    //유효성 에러 리턴

    if (validation.error) throw { name: "ValidationError" };
    const { orders, name } = req.body;
    //카테고리 존재 검증
    const category = await prisma.categories.findUnique({
      select: {
        name: true,
      },
      where: {
        id: +categoryId,
      },
    });

    //카테고리 존재 에러 리턴
    if (!category) throw { name: "notExist", message: "카테고리" };
    console.log(orders, name);

    //카테고리의 현재 순서 받아오기
    const curOrder = await prisma.categories.findUnique({
      select: {
        orders: true,
      },
      where: {
        id: Number(categoryId),
      },
    });
    

    //변경 할 순서와 현재순서 크기 비교해서 땡겨오거나 늘려주기
    if (curOrder.orders > Number(orders)) {
      await prisma.$queryRaw`
      UPDATE Categories 
      SET orders=orders+1
      WHERE orders >= ${Number(orders)}
      AND orders < ${curOrder.orders}
      AND NOT id = ${categoryId}`;

    } else if (curOrder.orders < Number(orders)) {

      await prisma.$queryRaw`
      UPDATE Categories 
      SET orders=orders-1
      WHERE orders > ${curOrder.orders}
      AND orders <= ${Number(orders)}
      AND NOT id = ${categoryId}`;
    }

    //카테고리 수정
    await prisma.$queryRaw`
    UPDATE Categories
    SET orders = ${orders}
    WHERE id = ${categoryId}`;

    return res.status(200).json({ message: "카테고리 정보를 수정하였습니다." });
  } catch (error) {
    next(error);
  }
});
/*
4. 카테고리 삭제 API
    - 선택한 카테고리 삭제하기
    - 카테고리 삭제 시, 해당 카테고리에 **연관된 모든 메뉴도 함께 삭제**됩니다.
    - 선택한 카테고리가 존재하지 않을 경우, “존재하지 않는 카테고리입니다." 메시지 반환하기
*/
router.delete("/categories/:categoryId", async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    //params 유효성 검증
    if (isNaN(Number(categoryId))) throw { name: "ValidationError" };

    //카테고리 존재 검증
    const category =
      await prisma.$queryRaw`select id from Categories where id = ${categoryId}`;

    //카테고리 에러 or Delete
    if (category.length === 0) {
      throw { name: "notExist", message: "카테고리" };
    } else {
      await prisma.$queryRaw`delete from Categories where id = ${categoryId} `;
    }

    return res.status(200).json({ message: "카테고리 정보를 삭제하였습니다." });
  } catch (error) {
    next(error);
  }
});

export default router;
