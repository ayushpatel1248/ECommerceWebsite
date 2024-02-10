const PasswordService = require("../services/PasswordService")

const PasswordController = {};

PasswordController.otpForforgotPassword = async (req, res) => {
    const { email, role } = req.body;
    console.log(role)
    const result = await PasswordService.otpForforgotPassword(email, role);
    res.send(result);
}
//----------------------------------------------------------------------------------

PasswordController.verifyOtp = async (req, res)=>{
    const {otpToBeVerified,  email, role} = req.body;
    const result = await PasswordService.verifyOtp(otpToBeVerified, email, role)
    res.send(result);
}

// ---------------------------------------------------------------------------

PasswordController.SetPassword = async (req, res)=>{
    const {verifier} = req.headers;
    const {newPassword, role} = req.body;
    const result = await PasswordService.SetPassword(verifier, newPassword, role);
    res.send(result);
}

//---------------------- for reset password with old password---------------------

PasswordController.resetPassword = async (req, res)=>{
    const {email, oldPassword, newPassword} = req.body;
    const result = await PasswordService.resetPassword(email, oldPassword, newPassword);
    res.send(result)
}

module.exports = PasswordController;