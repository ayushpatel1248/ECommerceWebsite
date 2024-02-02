const { decrypt } = require("dotenv");
const AdminService = require("../services/AdminService")
const joi = require('joi');
const jwt = require('jsonwebtoken')

const secretKey = "hahaha"  //key for decrypting admin side auth 


// this is schema for validatiing the data came from admin side at the time of registering 
const schema = joi.object({
    username: joi.string().min(4).max(40).required(),
    email: joi.string().email().required(),
    contactPhoneNumber: joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
    password: joi.string().min(4).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).messages({ "string.pattern.base": "min 8 char 1 upper case 1 lower case and one special character" }).required(),
    companyName: joi.string().min(1).required()
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
})



const adminController = {};

adminController.register = async (req, res) => {
    const { username, email, contactPhoneNumber, password, companyName } = req.body;
    try {
        await schema.validateAsync({ username, email, contactPhoneNumber, password, companyName })
        const result = await AdminService.register(username, password, email, companyName, contactPhoneNumber);
        res.send(result)
    }
    catch (err) {
        res.send({
            status: "err",
            msg: "error occured",
            data: err.details[0]
        })
    }
}

adminController.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        await loginSchema.validateAsync({ email, password })
        const result = await AdminService.login(email, password);
        res.send(result)
    }
    catch (err) {
        res.send({
            status: "err",
            msg: "error occured",
            data: err
        })
    }

}

// controller for updation of profile of admin 
const profileInfoUpdateJoiSchema = joi.object({
    companyLogo: joi.string().min(3).uri(),
    gst: joi.string().regex(/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/).messages({"string.pattern.base":"gst is incorrect"})
})

adminController.profileInfoUpdate = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const { companyLogo, companyAddress, gst } = req.body;  //here in this we assume that company logo url will come validation is acc to it
        await profileInfoUpdateJoiSchema.validateAsync({companyLogo, gst})
        const postalCodeSchema = joi.string().regex(/^[1-9][0-9]{5}$/).messages({ "string.pattern.base": "postal code is incorrect" })
        await postalCodeSchema.validateAsync(companyAddress.postalCode)
        const decryptAuth = jwt.verify(authorization, secretKey);

        if (decryptAuth) {
            const result = await AdminService.profileInfoUpdate(decryptAuth.adminId, companyLogo, companyAddress, gst)
            res.send(result)
        }
        else {
            res.send({
                status: "err",
                msg: "error occured while verifying the auth please re login",
                data: null
            })
        }
    }
    catch (err) {
        res.send({
            status: "err",
            msg: "error occured",
            data: err
        })
    }
};

module.exports = adminController