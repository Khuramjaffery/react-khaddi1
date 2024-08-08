import mongoose from "mongoose";
import colors from "colors"

const DbConnection=()=>{
    try{

  
    mongoose.connect("mongodb://localhost:27017/userProfile" );
    console.log("database is  connected succesfully"  .bgGreen);
}
catch(error){
    console.log("database is not connected succesfully"  .bgRed);
}
}



export default DbConnection;