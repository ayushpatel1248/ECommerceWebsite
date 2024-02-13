const User = require("../model/Users")

const UserService = {}

UserService.findUserWithEmail = async (email) => {
    return (await User.findOne({ email }))
}
UserService.registerUser = async (userName, email, mobileNumber, password) => {
    let a = await User.create({ userName, email, mobileNumber, password })
    return a
}

//----------------------------profile information-------------------------

UserService.addProfileInfo = async (_id, dateOfBirth, address, role) => {
    //checking if updation is possible then updating 
    try {
        let updatedInfo = await User.findOneAndUpdate({ _id }, { dateOfBirth, address, role }, { new: true, runValidators: true })
        console.log("this = ", updatedInfo);
        if (updatedInfo) {
            return {
                status: "OK",
                msg: "profile information updated successfully",
                data: null
            }
        }
        else {
            return {
                status: "err",
                msg: "error occures while updating the profile information",
                data: null
            }
        }
    }
    catch {
        return {
            status: "err",
            msg: "error occured may be you entered incorrect input",
            data: null
        }
    }

}


UserService.getUserData = async (_id) => {
    const result = await User.findOne({ _id });
    try {
        if (result) {
            delete result._doc.password
            return {
                status: "ok",
                msg: "user data send successfully",
                data: result
            }
        }
        else {
            return {
                status: "err",
                msg: "authentication error occured",
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

module.exports = UserService