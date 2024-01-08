import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma/index.js';


export default async function (req, res, next) {
  try {
    
    const cookies = req.cookies['authorization'];

    if (!cookies) {
      return res.status(403).json({
        errorMessage: '로그인이 필요한 기능입니다.',
      });
    }

    //토큰 확인
    const [tokenType, tokenValue] = cookies.split(' ');
    const { userId } = jwt.verify(tokenValue, 'Secret_orders_Key');
    
    const user = await prisma.users.findUnique({
      where: { id: Number(userId) , usertype:'OWNER' },
    });
    
    if(!user) throw { name:"No_permission"}
    next();
  } catch (error) {
    next(error);
  }
}
