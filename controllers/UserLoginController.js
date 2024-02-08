const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserService = require("../services/UserService")
const UserLoginController = {}
const SECRET_KEY = "hehehehe"

UserLoginController.login = async (req, res) => {
    const { email, password } = req.body;
    let foundedUser =await UserService.findUserWithEmail(email)
    if (foundedUser != null) {
        try {
            var passwordCheck = await bcrypt.compareSync(password, foundedUser.password);
            if(passwordCheck){    
                let token = await jwt.sign({ _id: foundedUser._id }, SECRET_KEY);
                let deepcopy = JSON.parse(JSON.stringify(foundedUser))
                delete deepcopy["password"]
                res.send({
                    status: "ok",
                    msg: "sucessfully login",           
                    authToken: token,
                    data: deepcopy 
                })
            }else{
                res.send({
                    status : "err",
                    msg :"incorrect password",
                    data : null
                }) 
            }
        } catch (err) {
            res.send({
                status : "err",
                msg :"send proper email and password in request",
                data : null
            }) 
        }
    } else {
        res.send({
            status: "err",
            msg: "user not exist with entered mail ",
            data: null
        })
    }
}

module.exports = UserLoginController