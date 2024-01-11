import express from "express";
import { prisma } from "../utils/prisma/index.js";
import Joi from "joi";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

const ordersSchema = Joi.object({
  menuId: Joi.string().min(1),
  quantity: Joi.string().min(1),
});

/**
 * 1. 메뉴 주문 API
    - 메뉴 Id, 주문 갯수를 **request**에서 전달받기
    - **메뉴 주문 API**는 하나의 메뉴만 주문 가능
    - **주문 상태(OrderType)**는 **주문 대기(`PENDING`), 접수 완료(`ACCEPTED`), 취소(`CANCEL`)** 타입이 존재합니다.
    - 메뉴 주문 시 기본 상태는 **주문 대기(`PENDING`)** 입니다.
    - 로그인 토큰을 검사하여, **사용자(CUSTOMER)** 토큰일 경우에만 주문 가능
*/
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    if (req.user.usertype === "OWNER")
      throw { name: "No_permission", message: "소비자" };

    console.log("메뉴주문");
    const validation = ordersSchema.validate(req.body);
    console.log(req.user);
    //유효성 검증
    if (validation.error) throw { name: "ValidationError", message: "데이터" };

    const { menuId, quantity } = validation.value;
    //메뉴 존재 검증
    const menu = await prisma.menu.findUnique({
      select: {
        id: true,
        name: true,
        price: true,
      },
      where: {
        id: Number(menuId),
        deleteAt: null,
      },
    });

    if (!menu) throw { name: "notExist", message: "메뉴" };

    await prisma.$queryRaw`insert into Orders (user_id,nickname,menu_id,menuName,quantity,totalPrice)
    values (${req.user.id},${req.user.nickname},${menuId},${
      menu.name
    },${quantity},${menu.price * quantity})`;

    return res.status(200).json({ message: "메뉴 주문에 성공하였습니다." });
  } catch (error) {
    next(error);
  }
});

/*
2. 사용자 주문 내역 조회 API
    - 사용자가 주문한 메뉴의 이름, 가격, 갯수, 주문 상태, 주문 날짜, 총 주문 금액 조회하기
    - 주문 날짜를 기준으로 내림차순(최신순) 정렬하기
    - 로그인 토큰을 검사하여, **사용자(CUSTOMER)** 토큰일 경우에만 주문 내역 조회 가능
*/
/*
3. 사장님 주문 내역 조회 API
    - 해당 매장에서 주문한 사용자 Id, 사용자 이름, 메뉴의 이름, 가격, 갯수, 주문 날짜, 총 주문 금액 조회하기
    - 주문 날짜를 기준으로 내림차순(최신순) 정렬하기
    - 로그인 토큰을 검사하여, **사장님(OWNER)** 토큰일 경우에만 주문 내역 조회 가능
*/
router.get("/:str", authMiddleware, async (req, res, next) => {
  try {
    const { str } = req.params;
    console.log(
      "주문내역조회 소비자 혹은 사장님",
      str,
      " <> ",
      req.user.usertype
    );
    let orders = {};
    if (str === "customer") {
      console.log(`주문내역조회(소비자)`);

      if (req.user.usertype == "OWNER")
        throw { name: "No_permission", message: "소비자" };
      // TBD

    } else {
      console.log(`주문내역조회(사장님)`);
      
      if (req.user.usertype === "CUSTOMER")
        throw { name: "No_permission", message: "사장님" };
      // TBD
    }

    return res.status(200).json({ data: orders });
  } catch (error) {
    next(error);
  }
});

/*
4. 주문 상태 변경 API
    - 주문 Id, 주문 상태를 **request**에서 전달받기
    - 로그인 토큰을 검사하여, **사장님(OWNER)** 토큰일 경우에만 주문 상태 변경 가능
*/
router.patch("/:orderId/status", authMiddleware, async (req, res, next) => {
  console.log("주문내역상태변경");
  try {
    if (req.user.usertype === "CUSTOMER")
      throw { name: "No_permission", message: "사장님" };

    const { status } = req.body;
    const { orderId } = req.params;
    if (!status) throw { name: "ValidationError", message: "데이터" };

    //카테고리 유효성 검증
    const categories =
      await prisma.$queryRaw`select id from Categories where id = 
      (select categories_id from Menu where menuId = 
        (select menu_id from Orders where ordersId=${orderId})
      )and categoriesDeleteAt IS null`;
    
    if (!categories) throw { name: "notExist", name: "카테고리" };
    
    //주문내역 유효성 검증
    const order =
      await prisma.$queryRaw`select ordersId from Orders where OrdersId=${orderId}`;
    if (!order) throw { name: "notExist", name: "주문내역" };

    await prisma.$queryRaw`update Orders set status=${status} where ordersId=${orderId}`;

    return res.status(200).json({ data: "주문 내역을 수정하였습니다." });
  } catch (error) {
    next(error);
  }
});
export default router;
