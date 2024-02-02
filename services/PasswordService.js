const Users = require("../model/Users")
const Admin = require("../model/Admin")
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

const PasswordService = {};

const saltRounds = 10;


// transporter for sending mail 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ayushpatel062004@gmail.com',
        pass: 'hiok hpiz nrib crqq'
    }
});


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
            }, 40000);
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
            msg: "error occured",
            data: err
        }
    }
}


PasswordService.verifyOtpAndSetPassword = async (otpToBeVerified, newPassword, email, role) => {
    console.log("above try")
    try {
        let model = null;
        if (role == "Admin" || role == "admin") {
            model = Admin
        }
        else if (role == "Users" || role == "users" || role == "user") {
            model = Users
        }
        // checking if otp is same 
        console.log("thi is otp form user =",otpToBeVerified)
        console.log("this is real otp", otp)
        if (otp == otpToBeVerified) {
            console.log("inside if of otp verfication")
            const newHashPassword = bcrypt.hashSync(newPassword, saltRounds);
            const updatedPass = await model.findOneAndUpdate({ "email": email }, { "password": newHashPassword })
            console.log("updated is == ",updatedPass)
            return {
                status: "OK",
                msg: "password changed successfully",
                data: null
            }
        }
        else {
            return {
                status: "err",
                msg: "otp verification error",
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