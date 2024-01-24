const jwt = require("jsonwebtoken")
const SECRET_KEY = "hehehehe" 

const decryptAuth = (token)=>{
    try{
        const {_id} = jwt.verify(token, SECRET_KEY);
        console.log(jwt.verify(token, SECRET_KEY))
        return _id;
    }
    catch(err){
        return null;
    }
}
module.exports = decryptAuth