const jwt = require("jsonwebtoken")
const SECRET_KEY = "hehehehe" 

const decryptAuth = (token)=>{
    try{
        const {_id} = jwt.verify(authorization, SECRET_KEY);
        return _id;
    }
    catch(err){
        return null;
    }
}
module.exports = decryptAuth