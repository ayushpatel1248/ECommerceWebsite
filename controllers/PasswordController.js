const PasswordService = require("../services/PasswordService")

const PasswordController = {};

PasswordController.otpForforgotPassword = async (req, res) => {
    const { email } = req.body;
    const result = await PasswordService.otpForforgotPassword(email);
    res.send(result);
}

// ---------------------------------------------------------------------------

PasswordController.verifyOtpAndSetPassword = async (req, res)=>{
    const {otpToBeVerified, newPassword, email} = req.body;
    console.log({otpToBeVerified, newPassword, email})
    const result = await PasswordService.verifyOtpAndSetPassword(otpToBeVerified, newPassword, email);
    res.send(result);
}

//---------------------- for reset password with old password---------------------

PasswordController.resetPassword = async (req, res)=>{
    const {email, oldPassword, newPassword} = req.body;
    const result = await PasswordService.resetPassword(email, oldPassword, newPassword);
    res.send(result)
}

module.exports = PasswordController;