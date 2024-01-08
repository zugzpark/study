import express from "express";
import { prisma } from "../utils/prisma/index.js";
import Joi from "joi";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

const menuSchema = Joi.object({
  name: Joi.string().min(1),
  description: Joi.string().min(1),
  image: Joi.string().min(1),
  price: Joi.string().min(1),
  orders: Joi.string().min(1),
  status: Joi.string().min(1),
});
/*
5. 메뉴 등록 API
    - 메뉴 이름, 설명, 이미지, 가격을 **request**에서 전달받기
    - 새롭게 등록된 메뉴는 **가장 마지막 순서**로 설정됩니다.
    - 메뉴는 두 가지 상태, **판매 중(`FOR_SALE`)및 매진(`SOLD_OUT`)** 을 가질 수 있습니다.
    - 메뉴 등록 시 기본 상태는 **판매 중(`FOR_SALE`)** 입니다.
    - 가격이 0원 이하일 경우, “메뉴 가격은 0보다 작을 수 없습니다.” 메시지 반환하기
*/
router.post(
  "/categories/:categoryId/menus",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;

      //유효성 에러 처리
      const resultSchema = menuSchema.validate(req.body);
      if (resultSchema.error)
        throw { name: "ValidationError", message: "데이터" };

      const { name, description, image, price } = resultSchema.value;
      console.log(
        `메뉴 등록 `,
        name,
        description,
        image,
        price,
        categoryId,
        req.body
      );

      //가격 에러 처리
      if (isNaN(price) || Number(price) < 0) throw { name: "priceValidation" };

      //카테고리 검증
      const category = await prisma.$queryRaw`
    SELECT name
    FROM Categories
    WHERE id = ${Number(categoryId)}`;

      //메뉴 등록 및 에러 처리
      if (category.length !== 0) {
        await prisma.$queryRaw`insert into Menu (menuName,description,image,price,menuOrder,categories_id)
      values (${name},${description},${image},${price},(
          select * from (select ifnull(max(menuOrder),0)+1 from Menu where categories_id=${categoryId}) as temp
      ),${categoryId})`;
      } else {
        throw { name: "notExist", message: "카테고리" };
      }

      return res.status(200).json({ message: "메뉴를 등록하였습니다." });
    } catch (error) {
      next(error);
    }
  }
);

/*
6. 카테고리별 메뉴 조회 API
    - 선택한 카테고리의 메뉴 이름, 이미지, 가격, 순서, 판매 상태 조회하기
    - 조회된 메뉴는 지정된 순서에 따라 정렬됩니다.
*/
router.get("/categories/:categoryId/menus", async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const menu = await prisma.$queryRaw`select menuId as id
      ,menuName as name
      ,image
      ,price
      ,menuOrder as 'order'
      ,status from Menu where categories_id=${categoryId}
      order by menuOrder asc`;

    return res.status(200).json({ data: menu });
  } catch (error) {
    next(error);
  }
});
/*
7. 메뉴 상세 조회 API
    - 선택한 카테고리의 메뉴 이름, 설명, 이미지, 가격, 순서, 판매 상태 조회하기
*/
router.get("/categories/:categoryId/menus/:menuId", async (req, res, next) => {
  try {
    const { categoryId, menuId } = req.params;
    //유효성 처리
    if (isNaN(categoryId) || isNaN(menuId))
      throw { name: "ValidationError", message: "데이터" };

    //카테고리 검증
    const category = await prisma.categories.findUnique({
      select: {
        name: true,
      },
      where: {
        id: Number(categoryId),
      },
    });

    //메뉴 상세 조회
    if (category) {
      const menu = await prisma.$queryRaw`
     select menuId as id
      ,menuName as name
      ,description
      ,image
      ,price
      ,menuOrder as 'order'
      ,status from Menu where menuId=${Number(menuId)}`;
      

      return res.status(200).json({ data: menu });
    } else {
      throw { name: "notExist", message: "카테고리" };
    }
  } catch (error) {
    next(error);
  }
});
/*
8. 메뉴 수정 API
    - 메뉴 이름, 설명, 이미지, 가격, 순서, 판매 상태를 **request**에서 전달받기
    - 가격이 0원 이하일 경우, “메뉴 가격은 0보다 작을 수 없습니다.” 메시지 반환하기
    - 선택한 메뉴가 존재하지 않을 경우, “존재하지 않는 메뉴입니다." 메시지 반환하기
*/
router.patch(
  "/categories/:categoryId/menus/:menuId",
  authMiddleware,
  async (req, res, next) => {
    try {
      //유효성 검증
      const { categoryId, menuId } = req.params;
      console.log(categoryId, menuId);

      const validation = menuSchema.validate(req.body);
      if (validation.error)
        throw { name: "ValidationError", message: "데이터" };
      //유효성 에러 리턴

      const { name, description, price, orders, status } = validation.value;

      //가격 유효성 에러리턴
      if (isNaN(price) || Number(price) < 0) throw { name: "priceValidation" };

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

      //메뉴 존재 검증
      const menu = await prisma.$queryRaw`
      SElECT menuId
      FROM Menu
      WHERE menuId = ${Number(menuId)}`;

      //메뉴 에러 리턴
      if (menu.length === 0) throw { name: "notExist", message: "메뉴" };

     //메뉴의 현재 순서 받아오기
      const curMenu = await prisma.menu.findUnique({
        select: {
          orders: true,
        },
        where: {
          id: Number(menuId),
        },
      });

      //변경 할 순서와 현재순서 크기 비교해서 땡겨오거나 늘려주기
      if (curMenu.orders > Number(orders)){
        await prisma.$queryRaw`
        UPDATE Menu 
        SET menuOrder=menuOrder+1
        WHERE menuOrder >= ${Number(orders)}
        AND menuOrder < ${curMenu.orders}
        AND NOT menuId = ${menuId}`;
        } else if (curMenu.orders < Number(orders)) {
          await prisma.$queryRaw`
        UPDATE Menu 
        SET menuOrder=menuOrder-1
        WHERE menuOrder > ${curMenu.orders}
        AND menuOrder <= ${Number(orders)}
        AND NOT menuId = ${menuId}`;
      }
      
      //메뉴 수정
      await prisma.$queryRaw`
      UPDATE Menu
      SET menuName=${name},
      description=${description},
      price=${price},
      menuOrder=${orders},
      status=${status}
      WHERE menuId = ${menuId}`;

      return res.status(200).json({ message: "메뉴를 수정하였습니다." });
    } catch (error) {
      next(error);
    }
  }
);
/*
9. 메뉴 삭제 API
    - 선택한 메뉴 삭제하기
    - 선택한 메뉴가 존재하지 않을 경우, “존재하지 않는 메뉴입니다." 메시지 반환하기
 * 
*/
router.delete(
  "/categories/:categoryId/menus/:menuId",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { categoryId, menuId } = req.params;

      //유효성 검증

      if (isNaN(categoryId) || isNaN(menuId))
        throw { name: "ValidationError", message: "데이터" };

      //카테고리 검증
      const category = await prisma.categories.findUnique({
        select: {
          id: true,
        },
        where: {
          id: Number(categoryId),
        },
      });
      //메뉴 검증
      const menu = await prisma.$queryRaw`
      SElECT menuId
      FROM Menu
      WHERE menuId = ${Number(menuId)}`;

      if (!category) {
        throw { name: "notExist", message: "카테고리" };
      } else if (!menu) {
        throw { name: "notExist", message: "메뉴" };
      } else {
        await prisma.$queryRaw`delete from Menu where menuId = ${menuId} `;
        return res
          .status(200)
          .json({ message: "카테고리 정보를 삭제하였습니다." });
      }
    } catch (error) {
      next(error);
    }
  }
);
export default router;
