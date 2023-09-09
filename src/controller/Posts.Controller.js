const Posts = require('../model/Posts.Model');
const Users = require('../model/Auth.Model')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.Secret;


const CreatePost = async(req,res) => {
    try {
        const { tags,post } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            const userId = await jwt.verify(token,secret);
            const newPost = await Posts.create({tags,post,userId})
            res.status(201).json(newPost)
        }
    } catch (error) {
        res.status(200).json(error.message)
    }
}

const GetPosts = async(req,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const userId = await jwt.verify(token,secret);
        const User = await Users.findOne({where:{id:userId}});
        console.log(User);
        const data = await Posts.findAll();
        const recomendation = await Posts.findAll({where:{tags:User.recomendations}});
        recomendation.length ? res.status(200).json(recomendation) : res.status(200).json(data)
    } catch (error) {
       res.status(500).json(error.message) 
    }
}

const GetOnePost = async(req,res) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization.split(' ')[1];
        console.log(id);
        const userId = await jwt.verify(token,secret);
        const data = await Posts.findByPk(id);
        await Users.update({recomendations:data.tags},{where:{id:userId}});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message) 
    }
}

module.exports = {
    CreatePost,
    GetPosts,
    GetOnePost
}