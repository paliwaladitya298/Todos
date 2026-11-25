const express = require("express")
const todo = express.Router()
const auth = require("../middleware/auth")
const {TodoList} = require("../model/todo")

todo.post("/todo" , auth , async(req , res)=>{
 
try {
    const {title , description , completed} = req.body
    const {_id} = req.user
  
    const todo_data = new TodoList({
    title, 
    description,
    completed,
    userId : _id
})
await todo_data.save()
res.send("Todo added Successfully")

}
 catch (error) {
 res.status(400).send(error.message)   
}
})

todo.get("/todo" , auth , async(req , res)=>{

    try {
        const {_id} = req.user
         const todos = await TodoList.find({userId :_id})
    res.send(todos)
    } catch (error) {
        res.status(400).send(error.message)   
    }
})

todo.patch("/todo/update/:id" , auth, async(req , res)=>{

    try {
        const {title , description , completed} = req.body
        const {id} = req.params

    const todo = await TodoList.findOneAndUpdate(
        {_id : id, userId : req.user._id} , 
        {
        title , 
        description,
        completed }
        )
  res.send("successfully updated")
    } catch (error) {
         res.status(400).send(error.message)  
    }
})

todo.delete("/todo/delete/:id" , auth , async(req , res)=>{

    try {
         const {id} = req.params
         await TodoList.findOneAndDelete( {_id : id, userId : req.user._id})
         res.send("deleted Successfully")
    } catch (error) {
        res.status(400).send(error.message)  
    }
   
})

module.exports = todo
