import express from "express";
import Product from "../schemas/products.schema.js";
import Joi from "joi";

const router = express.Router();

/**
 * 상품 목록 조회 API
- 상품명, 작성자명, 상품 상태, 작성 날짜 조회하기
- 상품 목록은 작성 날짜를 기준으로 **내림차순(최신순)** 정렬하기
 */
router.get("/products", async (req, res) => {
  const data = await Product.find(
    {},
    {
      _id: "$_id",
      title: "$title",
      content: "$content",
      author: "$author",
      status: "$status",
      createAt: "$createAt",
    },
  ).sort("-createAt");

  return res.status(200).json({ data });
});

/**
 * 상품 작성 API
- 상품명, 작성 내용, 작성자명, 비밀번호를 **request**에서 전달받기
- 상품은 두 가지 상태, **판매 중(`FOR_SALE`)및 판매 완료(`SOLD_OUT`)** 를 가질 수 있습니다.
- 상품 등록 시 기본 상태는 **판매 중(`FOR_SALE`)** 입니다.
 */
router.post("/products", async (req, res, next) => {
  try {
    const createProducts = Joi.object({
      title: Joi.string().min(1),
      content: Joi.string().min(1),
      author: Joi.string().min(1),
      password: Joi.string().min(1),
    });
    const validateBody = await createProducts.validateAsync(req.body);

    const { title, content, password, author } = validateBody;
    
    const products = new Product({
      title: title,
      content: content,
      author: author,
      password: password,
      status: "FOR_SALE",
      createAt: new Date(),
    });

    await products.save();

    return res.status(200).json({ messege: "판매 상품을 등록하였습니다." });
  } catch (error) {
    next(error);
  }
});

/**
 * 상품 상세 조회 API
- 상품명, 작성 내용, 작성자명, 상품 상태, 작성 날짜 조회하기
 */
router.get("/products/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;

    const data = await Product.find(
      { _id: productId },
      {
        _id: "$_id",
        title: "$title",
        content: "$content",
        author: "$author",
        status: "$status",
        createAt: "$createAt",
      },
    );

    if (data === null) throw { name: "CastError" };

    return res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

/**
 * 상품 정보 수정 API
- 상품명, 작성 내용, 상품 상태, 비밀번호를 **request**에서 전달받기
- 수정할 상품과 비밀번호 일치 여부를 확인한 후, 동일할 때만 글이 **수정**되게 하기
- 선택한 상품이 존재하지 않을 경우, “상품 조회에 실패하였습니다." 메시지 반환하기
 */
router.patch("/products/:productId", async (req, res, next) => {
  try {
    //params 비밀번호 조회
    const { productId } = req.params;
    const data = await Product.findOne(
      { _id: productId },
      {
        password: "$password",
      },
    ).exec();

    if (data === null) throw { name: "CastError" };

    //body form 값 유효성 검증
    const updateProducts = Joi.object({
      title: Joi.string().min(1),
      content: Joi.string().min(1),
      status: Joi.string().min(1),
      password: Joi.string().min(1),
    });
    const validateBody = await updateProducts.validateAsync(req.body);

    //비밀번호가 맞지 않을경우 에러로 리턴
    if (validateBody.password !== data.password)
      throw {
        name: "passwordNotMatch",
        method: "수정",
      };

    //수정
    Product.updateMany(
      { _id: productId },
      {
        title: validateBody.title,
        content: validateBody.content,
        status: validateBody.status,
      },
    ).exec();

    return res.status(200).json({ message: "상품 정보를 수정하였습니다." });
  } catch (error) {
    next(error);
  }
});

/**
 * 상품 삭제 API
- 비밀번호를 **request**에서 전달받기
- 수정할 상품과 비밀번호 일치 여부를 확인한 후, 동일할 때만 글이 **삭제**되게 하기
- 선택한 상품이 존재하지 않을 경우, “상품 조회에 실패하였습니다." 메시지 반환하기
 */
router.delete("/products/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;

    //비밀번호 조회
    const data = await Product.findOne(
      { _id: productId },
      {
        password: "$password",
      },
    ).exec();

    if (data === null) throw { name: "CastError" };
    //body form 값 유효성 검증
    const updateProducts = Joi.object({
      password: Joi.string().min(1),
    });

    const validateBody = await updateProducts.validateAsync(req.body);

    //비밀번호가 맞지 않을경우 에러로 리턴
    if (validateBody.password !== data.password)
      throw {
        name: "passwordNotMatch",
        method: "삭제",
      };

    //삭제
    await Product.deleteOne({ _id: productId }).exec();

    return res.status(200).json({ message: "상품 정보를 삭제하였습니다." });
  } catch (error) {
    next(error);
  }
});

export default router;
