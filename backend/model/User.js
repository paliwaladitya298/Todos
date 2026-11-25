const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserSchema = mongoose.Schema({

firstName : {
    type : "String",
    required : true,
    minLength : 4,
    maxLength : 20
},
lastName : {
     type : "String",
    required : true,
    minLength : 2
},
email : {
     type : "String",
    required : true,
    unique : true,
    trim : true,
    lowercase : true,
    validate(value){
     if( !validator.isEmail(value)){
        throw new Error("email is not valid")
     }
    }
},
password : {
     type : "String",
    required : true
}
})

UserSchema.methods.validatePassword = async function(passwordInputByUser){

   const  user =  this
   const isPasswordValid = await bcrypt.compare(passwordInputByUser , user.password)
   return isPasswordValid

}

UserSchema.methods.getJwt = async function(){
    const user = this
    const token = jwt.sign({_id : user._id} , process.env.JWT_TOKEN , {expiresIn : "1h"})
    return token
}

const User = mongoose.model("User" , UserSchema)

module.exports  = {User}
