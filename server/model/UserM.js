const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    roles:{
        User:{
            type:Number,
            default:2001
        },
        Editor:Number,
        Admin:{
            type:Number,
            default:5150
        },
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:[String]
},{timestamps:true})

const User = mongoose.model("User",userSchema)
module.exports = User

