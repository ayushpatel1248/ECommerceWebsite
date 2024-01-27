const UserService = require("../services/UserService")
const verifyAuth = require("../reUseAbleFunctions/decryptAuth")


const UserController  = {}

// --------------------- for user profile information update ------------------------------

UserController.addProfileInfo = async (req, res)=>{
    const { authorization } = req.headers;
    const _id = verifyAuth(authorization)
    const {dateOfBirth, address, role} =  req.body;
    const result = await UserService.addProfileInfo(_id, dateOfBirth, address, role);
    res.send(result)
}


module.exports = UserController