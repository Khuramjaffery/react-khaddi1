import express from "express";
import colors from "colors";
import DbConnection from "./Database/db.js";
import dotenv from "dotenv"
import User from "./Model/User.js";
import cors from "cors"
const app=express();
app.use(express.json());
DbConnection();
dotenv.config();
app.use(cors());

app.post("/post-data", async(req,res)=>{
    const data= await new User(req.body);
    const result =await data.save();
    res.send(result);
})

app.get("/get-data", async(req,res)=>{
    const data=await  User.find();
    res.send(data);

})

app.delete("/delete-user/:id", async(req,res)=>{
    const id=req.params.id;
    const data=await User.findById(id);
    if(!data){
        return res.send({message:"user not found" })
    }
    else{
        await User.findByIdAndDelete(id);
      return res.send({message:"user delete"})
    }
})


app.get("/find-user/:id", async(req,res)=>{
    let data =await User.findOne({_id:req.params.id})
    res.send(data);
})

app.put("/update-user/:id", async(req,res)=>{
    let data =await User.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    res.send(data);
})



app.get("/search/:key", async(req,res)=>{
    let data=await User.find({
        "$or":[
            {
                name:{$regex: req.params.key}
            },
            {
                email:{$regex : req.params.key}
            },
            {
                password:{$regex : req.params.key}
            }
        ]
    })
    res.send(data);
})



const port=process.env.Port|| 5000;


app.listen(port,()=>{
    console.log(`server port is ${port} and ${process.env.app}` .bgGreen )
})
