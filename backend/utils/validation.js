const validator = require("validator")

const validation = (req)=>{
    const {firstName , lastName , email , password} = req.body
    if(!firstName || !lastName || !email || !password){
        throw new Error("Enter the input field")
    }
     if(!validator.isEmail(email)){
        throw new Error("email is not correct")
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Enter the strong password")
    }

}

module.exports = validation