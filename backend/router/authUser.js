const express = require("express")
const {User} = require("../model/User")
const bcrypt = require("bcrypt")
const autherUser = express.Router()
const validation = require("../utils/validation")
const jwt = require("jsonwebtoken")

autherUser.post("/signUp" , async(req , res)=>{


   try {
    const {firstName , lastName , email , password} = req.body

    validation(req)
    const Hashpassword =  await bcrypt.hash(password , 10)

   const User_data =  new User({
    firstName, 
    lastName,
     email, 
     password : Hashpassword
   })
   await User_data.save()
   res.send("data added Successfully")
   } catch (error) {
    res.status(400).send(error.message)
   }
})

autherUser.post("/login" ,async(req , res)=>{

    try{
    const {email , password} = req.body
    const Userfound =  await User.findOne({email : email})
    if(!Userfound){
    return res.status(401).send("Invalid Credential")
     }
     const ValidatingPassword = await Userfound.validatePassword(password)
     if(!ValidatingPassword){
        return res.status(401).send("Invalid Credential")
     }
     const jwt_token = await Userfound.getJwt()
     res.cookie('token' , jwt_token)
     return res.send("Login Successfully")

    }catch(error){
     res.status(400).send(error.message)
    }

})

autherUser.post("/logout" , async(req , res)=>{
res.cookie("token" , null)
res.send("logout")
})


module.exports = autherUser
