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

UserService.updateUserEmail = async (_id, newEmail, role) => {
    console.log(role)
    if (role == "user" || role == "User") {
        const result = await User.findOne({ _id })
        if (result == null) {
            return ({
                status: "err",
                msg: "unauthorized access",
                data: null
            })
        } else {
            try {
                let updatedInfo = await User.findOneAndUpdate({ _id }, { email:newEmail})
                if (updatedInfo) {
                    return {
                        status: "OK",
                        msg: "email information updated successfully",
                        data: null
                    }
                }
                else {
                    return {
                        status: "err",
                        msg: "error occures while updating the email information",
                        data: null
                    }
                }
            } catch {
                return {
                    status: "err",
                    msg: "server error in user service",
                    data: null
                }
            }
        }
    }else if(role ==undefined){
        return {
            status: "err",
            msg: "role is required field",
            data: null
        }
    }
}

UserService.updateUserName = async (_id,newUserName, role) =>{
    if (role == "user" || role == "User") {
        const result = await User.findOne({ _id })
        if (result == null) {
            return ({
                status: "err",
                msg: "unauthorized access",
                data: null
            })
        } else {
            try {
                let updatedInfo = await User.findOneAndUpdate({ _id }, { userName:newUserName})
                if (updatedInfo) {
                    return {
                        status: "OK",
                        msg: "userName information updated successfully",
                        data: null
                    }
                }
                else {
                    return {
                        status: "err",
                        msg: "error occures while updating the userName information",
                        data: null
                    }
                }
            } catch {
                return {
                    status: "err",
                    msg: "server error in user service",
                    data: null
                }
            }
        }
    }else if(role ==undefined){
        return {
            status: "err",
            msg: "role is required field",
            data: null
        }
    }
}

UserService.updateUserMobileNumber = async (_id,newMobileNumber, role)=>{
    if (role == "user" || role == "User") {
        const result = await User.findOne({ _id })
        if (result == null) {
            return ({
                status: "err",
                msg: "unauthorized access",
                data: null
            })
        } else {
            try {
                let updatedInfo = await User.findOneAndUpdate({ _id }, { mobileNumber:newMobileNumber})
                if (updatedInfo) {
                    return {
                        status: "OK",
                        msg: "mobileNumber information updated successfully",
                        data: null
                    }
                }
                else {
                    return {
                        status: "err",
                        msg: "error occures while updating the mobileNumber information",
                        data: null
                    }
                }
            } catch {
                return {
                    status: "err",
                    msg: "server error in user service",
                    data: null
                }
            }
        }
    }else if(role ==undefined){
        return {
            status: "err",
            msg: "role is required field",
            data: null
        }
    }
}

UserService.updateUserAddress = async (_id,street, city , state , postalCode, role)=>{
    if (role == "user" || role == "User") {
        const result = await User.findOne({ _id })
        if (result == null) {
            return ({
                status: "err",
                msg: "unauthorized access",
                data: null
            })
        } else {
            try {
                let updatedInfo = await User.findOneAndUpdate({ _id }, { address:{street, city , state , postalCode}})
                if (updatedInfo) {
                    return {
                        status: "OK",
                        msg: "address information updated successfully",
                        data: null
                    }
                }
                else {
                    return {
                        status: "err",
                        msg: "error occures while updating the address information",
                        data: null
                    }
                }
            } catch {
                return {
                    status: "err",
                    msg: "server error in user service",
                    data: null
                }
            }
        }
    }else if(role ==undefined){
        return {
            status: "err",
            msg: "role is required field",
            data: null
        }
    }
}

UserService.updateUserImage = async (_id ,image , role)=>{
    if (role == "user" || role == "User") {
        const result = await User.findOne({ _id })
        if (result == null) {
            return ({
                status: "err",
                msg: "unauthorized access",
                data: null
            })
        } else {
            try {
                let updatedInfo = await User.findOneAndUpdate({ _id }, { image:image})
                if (updatedInfo) {
                    return {
                        status: "OK",
                        msg: "image information updated successfully",
                        data: null
                    }
                }
                else {
                    return {
                        status: "err",
                        msg: "error occures while updating the image information",
                        data: null
                    }
                }
            } catch {
                return {
                    status: "err",
                    msg: "server error in user service",
                    data: null
                }
            }
        }
    }else if(role ==undefined){
        return {
            status: "err",
            msg: "role is required field",
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