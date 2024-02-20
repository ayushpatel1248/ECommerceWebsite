const UserService = require("../services/UserService")
const verifyAuth = require("../reUseAbleFunctions/decryptAuth")
const Joi = require('joi');


const UserController = {}

// --------------------- for user profile information update ------------------------------

UserController.addProfileInfo = async (req, res) => {
    const { authorization } = req.headers;
    const _id = verifyAuth(authorization)
    const { dateOfBirth, address, role } = req.body;

    const usPostalCodeSchema = Joi.string().regex(/^[1-9][0-9]{5}$/);
    const validationResult = usPostalCodeSchema.validate(address.postalCode);
    console.log(!validationResult.error)
    if (!validationResult.error) {
        const result = await UserService.addProfileInfo(_id, dateOfBirth, address, role);
        res.send(result)
    }
    else{
        res.send({
            status:"err",
            msg:"validation error occured",
            data:null
        })
    }


}

UserController.getUserData = async (req , res) => {
    const { authorization } = req.headers;
    const _id = verifyAuth(authorization)
    const result = await UserService.getUserData(_id);
    res.send(result)
}

UserController.updateUserEmail =async (req,res)=>{
    const { authorization } = req.headers;
    const { newEmail, role } = req.body;

    const _id = verifyAuth(authorization)
    const emailValidationSchema = Joi.string().regex(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
    const validationResult = emailValidationSchema.validate(newEmail);

    if (!validationResult.error) {
        const result = await UserService.updateUserEmail(_id,newEmail, role)
        res.send(result)
    }
    else{
        res.send({
            status:"err",
            msg:"validation error occured",
            data:null
        })
    }

}

UserController.updateUserName = async (req,res)=>{
    const { authorization } = req.headers;
    const { newUserName, role } = req.body;
    const _id = verifyAuth(authorization)
    const userNameValidationSchema = Joi.string().min(4).max(40).required();
    const validationResult = userNameValidationSchema.validate(newUserName);


    if (!validationResult.error) {
        const result = await UserService.updateUserName(_id,newUserName, role)
        res.send(result)
    }
    else{
        res.send({
            status:"err",
            msg:"validation error occured",
            data:null
        })
    }
}
module.exports = UserController