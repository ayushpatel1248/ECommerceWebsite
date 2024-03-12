const jwt = require("jsonwebtoken")
const SECRET_KEY = "hahaha" 

const decryptAdminAuth = (token)=>{
    try{
        const {adminId} = jwt.verify(token, SECRET_KEY);
        console.log(jwt.verify(token, SECRET_KEY))
        return adminId;
    }
    catch(err){
        return null;
    }
}
module.exports = decryptAdminAuth