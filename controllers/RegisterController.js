
const joi = require('joi');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const UserService = require("../services/UserService")
const RegisterController = {}
const schema = joi.object({
    userName : joi.string().min(4).max(40).required(),
    email:joi.string().email().required(),
    mobileNumber : joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
    password: joi.string().min(4).required()
})

var SALT_ROUND = 10
var SECRET_KEY = "hehehehe"
RegisterController.create = async(req , res)=>{
console.log("register controller working...")

const {userName , email , mobileNumber , password } = req.body;
try{
    await schema.validateAsync({userName , email , mobileNumber, password});
    const foundUser = await UserService.findUserWithEmail(email)
    console.log("in try" , foundUser)
    if(foundUser == null){ 
        hash = bcrypt.hashSync(password, SALT_ROUND);
        var  a = await UserService.registerUser(userName , email , mobileNumber, hash)
        const token = jwt.sign({_id:a._id},SECRET_KEY);
        let deepcopy = JSON.parse(JSON.stringify(a))
        delete deepcopy["password"] 
        res.send({
            status:"ok",
            msg: "user regrestration sucessfully complete",
            data : {"authToken": token , "userdata":deepcopy}
        })
     }
     else{
        res.send({
            status:"err",
            msg: "user already exist with entered mail",
            data : null  
        })
     }
}
catch(err){
    res.send({
        status : "err", 
        msg : " comes at server side in register controller...", 
        data : err, 
    })
}

}
module.exports = RegisterController
