const { Router } = require('express');
const { CreatePost, GetPosts, GetOnePost } = require('../controller/Posts.Controller');


const router = Router();

router.post('/posts',CreatePost);
router.get('/posts',GetPosts);
router.get('/posts/:id',GetOnePost)


module.exports = router;