const Users = require("../model/Users")
const Admin = require("../model/Admin")
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const PasswordService = {};

var SECRET_KEY = "hehehehe"
const saltRounds = 10


// transporter for sending mail 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ayushpatel062004@gmail.com',
        pass: 'hiok hpiz nrib crqq'
    }
});


const decryptAuth = (token) => {
    try {
        const { email } = jwt.verify(token, SECRET_KEY);
        console.log(jwt.verify(token, SECRET_KEY))
        return email;
    }
    catch (err) {
        return null;
    }
}


// ----------------------------------------------for sending otp  for new password--------------------------------------------------
var otp;


PasswordService.otpForforgotPassword = async (email, role) => {
    try {
        let model = null;
        if (role == "Admin" || role == "admin") {
            model = Admin
        }
        else if (role == "Users" || role == "users" || role == "user") {
            model = Users
        }
        const userFound = await model.findOne({ "email": email });
        console.log(userFound)

        //checking if user exist with this email
        if (userFound) {
            otp = Math.random().toString().substr(2, 6);
            console.log(otp);
            var mailOptions = {
                from: 'ayushpatel062004@gmail.com',
                to: `${email}`,
                subject: 'otp for new password',
                text: `${otp}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            // from below code otp will automatically expire after 20 seconds
            setTimeout(() => {
                otp = `${Math.random().toString().substr(2, 6)}`
            }, 30000);
            return {
                status: "OK",
                msg: "otp send successfully",
                data: null
            }
        }
        else {
            return {
                status: "err",
                msg: "no user found with this email",
                data: null
            }
        }
    }
    catch (err) {
        return {
            status: "err",
            msg: "error occured in password service",
            data: err
        }
    }
}


//----------------------------veify OTP---------------------------------------
PasswordService.verifyOtp = async (otpToBeVerified, email, role) => {
    console.log("inside varify otp")
    let model = null;
    try {
        if (role == "Admin" || role == "admin") {
            model = Admin
        }
        else if (role == "Users" || role == "users" || role == "user") {
            model = Users
        }

        if (otp == otpToBeVerified) {
            const token = jwt.sign({ email }, SECRET_KEY);

            return {
                status: "OK",
                msg: " otp varified successfully successfully",
                data: { "verifier": token }
            }
        }
        else {
            return {
                status: "err",
                msg: "wrong otp",
                data: null
            }
        }
    }
    catch (err) {
        return {
            status: "err",
            msg: "server error",
            data: null
        }
    }
}
////----------------------------reset OTP---------------------------------------

PasswordService.SetPassword = async (verifier, newPassword, role) => {
    console.log("above try")
    try {
        // checking if otp is same 
        let model = null;
        if (role == "Admin" || role == "admin") {
            model = Admin
        }
        else if (role == "Users" || role == "users" || role == "user") {
            model = Users
        }

        const verificationResult = decryptAuth(verifier)
        console.log("here = ", verificationResult)
        if (verificationResult) {
            console.log("inside", newPassword)
            const newHashPassword = bcrypt.hashSync(newPassword, saltRounds);
            console.log(newHashPassword)
            console.log("after hash sync")
            console.log(model)
            const updatedPass = await model.findOneAndUpdate({ "email": verificationResult }, { "password": newHashPassword })
            console.log("updated is == ", updatedPass)
            return {
                status: "OK",
                msg: "password changed successfully",
                data: null
            }
        }
        else {
            return {
                status: "err",
                msg: "some error occured",
                data: null
            }
        }
    }
    catch {
        return {
            status: "ERR",
            msg: "error",
            data: null
        }
    }

}


PasswordService.resetPassword = async (email, oldPassword, newPassword) => {
    try {
        const userFound = await Users.findOne({ "email": email });
        if (userFound) {
            const newHashPassword = bcrypt.hashSync(newPassword, saltRounds);
            console.log("here")
            const check = bcrypt.compareSync(oldPassword, userFound.password);
            console.log(check)
            if (check) {
                const updatedPass = await Users.findOneAndUpdate({ "email": email }, { "password": newHashPassword })
                return {
                    status: "OK",
                    msg: "password changed successfully",
                    data: updatedPass
                }
            }
            else {
                return {
                    status: "err",
                    msg: "old password is incorrect",
                    data: null
                }
            }


        }
        else {
            return {
                status: "err",
                msg: "no user exist with this email",
                data: null
            }
        }


    }
    catch {
        return {
            status: "err",
            msg: "server error",
            data: null
        }
    }
}
module.exports = PasswordService