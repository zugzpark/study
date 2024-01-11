const express = require("express");
const Post = require("../models/posts");
const router = express.Router();

//게시글을 작성하는 API
const createNewPost = async (req, res) => {
    const { title, content } = req.body;

  const post = new Post({
    title: title,
    content: content,
  });

  await post.save();

  res.send({ id: post.id, title: post.title, content: post.content });
};

//게시글을 전체 조회하는 API
const getAllPosts = async (req, res) => {
  try {
    const post = await Post.find(
      {},
      {
        _id: 0,
        id: "$id",
        title: "$title",
        content: "$content",
      }
    );

    res.send(post);
  } catch (error) {
    return res.status(400).json({ message: "에러" });
  }
};

//게시글을 수정하는 API
const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    
    const post = await Post.findOne({id:postId},{});

    post.title = title
    post.content = content

    await post.save()
    
    res.send({id: post.id, title: post.title, content: post.content });
  } catch (error) {
    return res.status(400).json({ message: "에러" });
  }
};

//게시글을 삭제하는 API
const deletePostById = async (req, res) => {
  try {
    const { postId } = req.params;
    
    await Post.findOneAndDelete({ id: postId });

    res.send({message:"success"})
  } catch (error) {
    return res.status(400).json({ message: "에러" });
  }
};

router.post("/api/posts", createNewPost);
router.get("/api/posts", getAllPosts);
router.put("/api/posts/:postId", updatePost);
router.delete("/api/posts/:postId", deletePostById);

module.exports = router;
