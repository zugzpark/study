import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma/index.js";

export default async function (req, res, next) {
  try {
    const cookies = req.cookies["authorization"];

    if (!cookies) throw { name: "needLogin" };

    //토큰 확인
    const [tokenType, tokenValue] = cookies.split(" ");
    const { userId } = jwt.verify(tokenValue, "Secret_orders_Key");
    
    if (!cookies) throw { name: "needLogin" };
    const user = await prisma.users.findUnique({
      select: { id: true, nickname: true, usertype: true },
      where: { id: Number(userId) },
    });

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}
