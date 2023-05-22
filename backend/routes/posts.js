const express =  require('express');
const router = express.Router();
const Post = require('../models/post')
const checkAuth = require('../middleware/check-auth')

router.post('',checkAuth, (req, res, next) => {
  const post = new Post({
    title:req.body.title,
    content:req.body.content
  });
  post.save();
  res.status(201).json({
    message:'Post added successfully'
  })
})

router.get('',checkAuth, (req,res)=> {
  const pageSize = req.query.pageSize
  const pageIndex = req.query.pageIndex
  const postQuery = Post.find();
  let fetchedPost;
  if(pageSize && pageIndex){
    postQuery.skip(pageSize * (pageIndex-1)).limit(pageSize);
  }
  postQuery.then(doc => {
    fetchedPost = doc;
    return Post.count();
  }).then(count => {
    res.status(200).json({
      message:'success',
      post: fetchedPost,
      count: count
    })
  })
})

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({_id:req.params.id}).then(() => {
    res.status(200).json({
      message:'Post deleted successfully'
    })
  })
})

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id:req.params.id,
    title:req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id:req.params.id}, post).then(() => {
    res.status(200).json({
      message :'post updated successfully'
    })
  })
})

module.exports = router;
