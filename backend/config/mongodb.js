const mongoose = require("mongoose")


const Connection = async() => {
   await mongoose.connect(process.env.MongoDB_URL)
}

module.exports = {Connection}