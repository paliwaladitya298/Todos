const jwt = require('jsonwebtoken')
const {User} = require("../model/User")

const auth = async (req , res , next)=>{
    try {
         const {token} = req.cookies
    if(!token){
        throw new Error("Invalid Credential")
    }
    const decodedObj = jwt.verify(token , process.env.JWT_TOKEN)
    const {_id} = decodedObj
    const user = await User.findById(_id)
    if(!user){
        throw new Error("user not found")
    }
    req.user = user
    next()
    } catch (error) {
        res.status(400).send(error.message)
    }
    
}

module.exports = auth