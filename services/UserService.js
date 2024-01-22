
const User = require("../model/Users")

const UserService = {}

 UserService.findUserWithEmail = async (email) => {
     return (await User.findOne({email}))
 }
 UserService.registerUser = async (userName , email , mobileNumber, password)=>{
    let a =  await User.create({userName, email , mobileNumber , password})
    return a
 }

module.exports = UserService