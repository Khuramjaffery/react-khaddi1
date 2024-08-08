import mongoose from "mongoose";


const scheme =new mongoose.Schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true

},
password:{
    type:String,
    required:true,
    trim:true
},

},

{timestamps:true}
)

const User =mongoose.model("users", scheme);
export default User;