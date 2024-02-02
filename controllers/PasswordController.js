const PasswordService = require("../services/PasswordService")

const PasswordController = {};

PasswordController.otpForforgotPassword = async (req, res) => {
    const { email, role } = req.body;
    console.log(role)
    const result = await PasswordService.otpForforgotPassword(email, role);
    res.send(result);
}

// ---------------------------------------------------------------------------

PasswordController.verifyOtpAndSetPassword = async (req, res)=>{
    const {otpToBeVerified, newPassword, email, role} = req.body;
    console.log(role)
    console.log({otpToBeVerified, newPassword, email})
    const result = await PasswordService.verifyOtpAndSetPassword(otpToBeVerified, newPassword, email, role);
    res.send(result);
}

//---------------------- for reset password with old password---------------------

PasswordController.resetPassword = async (req, res)=>{
    const {email, oldPassword, newPassword} = req.body;
    const result = await PasswordService.resetPassword(email, oldPassword, newPassword);
    res.send(result)
}

module.exports = PasswordController;