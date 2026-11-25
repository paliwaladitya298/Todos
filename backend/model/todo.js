const mongoose = require("mongoose")


const TodoSchema = mongoose.Schema({

title : {
    type : "String",
    required : true,
    trim : true
},

description : {
    type : "String",
    trim : true
},
completed: {
    type : "Boolean",
    required : true
},

userId : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : "User"
}

})


const TodoList = mongoose.model("TodoList" , TodoSchema)

module.exports  = {TodoList}
