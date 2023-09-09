const User = require('../model/Auth.Model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const secret = process.env.Secret;


const Register = async(req,res) => {
    try {
        const { username,password,gender,age } = req.body;
        const user = await User.findAll({where:{username:username}});
        if (user.length) {
            res.status(403).json({message:"username bor"});
        }
        else{
           const passHash = await bcrypt.hash(password,10);
           const recomendations = [];
           const data = await User.create({username,password:passHash,gender,age,recomendations});
           console.log(data);
            res.status(201).json({message:"succes"})
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const Login = async(req,res) => {
    try {
        const { username,password } = req.body;
        const user = await User.findOne({where:{username:username}});
        console.log(user);
        const compare = await bcrypt.compare(password,user.password);
        if (compare) {
            const token = await jwt.sign(user.id,secret)
            res.status(200).json({token:token});
        }
        else{
            res.status(404).json({message:"password or username error"})
        }
    } catch (error) {
        res.status(500).json(error.message) 
    }
}


module.exports = {
    Register,
    Login
}