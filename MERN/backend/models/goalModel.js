const mongoose=require("mongoose")

const Schema = mongoose.Schema

const goalSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    plan:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    deadline:{
        type:Date,
        requried:true
    }
},{timestamps:true})

module.exports=mongoose.model("Goal",goalSchema)

