import express from "express";
import member from "../schemas/member.schema.js";

const router = express.Router();

/**
 * 1. 회원 전체 조회
 */
router.get("/user", async (req, res) => {
  const data = await member.find({});

  res.send(data);
});

/**
 * 2. 회원 정보 조회
 */
router.get("/user/:userId", async (req, res) => {
  const { id } = req.params;

  const data = await member.find(
    { userId: id },
    {
      userId: "$userId",
      name: "$name",
      emial: "$email",
      pw: "$pw",
    }
  );

  return res.status(200).json(data);
});

//등록
router.post("/user", async (req, res) => {
  const { userId, name, email, pw } = req.body;

  const members = new member({
    userId: userId,
    name: name,
    email: email,
    pw: pw,
  });
  await members.save();
  console.log(userId, name, email, pw);

  return res.status(200).json({ messege: "등록" });
});

export default router;
