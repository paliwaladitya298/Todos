const express = require("express")
const app = express()
require("dotenv").config();
const {Connection} = require("./config/mongodb") 
const cookieParser = require("cookie-parser")
const cors = require("cors")

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const autherUser = require("./router/authUser");
const todo = require("./router/TodoList")


app.use("/", autherUser)
app.use("/", todo)

 Connection().then(()=>{
        console.log("MogoDB is connected");
        app.listen(3000 , ()=>{
    console.log("server running on port 3000");
      })
    }
).catch((error)=>{
        console.log(error.message);
    })


