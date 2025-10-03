import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import 'dotenv/config'
import path from "path"
import { fileURLToPath } from "url"

const app=express();
app.use(cors());
app.use(express.json());

const  __filename=fileURLToPath(import.meta.url);
const  __dirname=path.dirname(__filename);

app.use(express.static(path.join(__dirname,"..","public")));


async function server(){
try{
   console.log("connecting to db...");
 await mongoose.connect(process.env.MONGODB_URI);
   console.log("mongodb connected");
  app.listen(process.env.PORT,(req,res)=>{
   console.log(`backend server started at http://localhost:${process.env.PORT}`);
});
}catch(error){
  console.error("MONGODB connection failed,error message: ",error.message);
  console.error(error);
}

}
server();

const  todoSchema=new mongoose.Schema({
    text:{
       type:String,
       required:true
},
    done:{
          type:Boolean,
          default:false
          }
});

  const Todo=mongoose.model("Todo",todoSchema);


app.get("/",(req,res)=>{
 res.sendFile(path.join(__dirname,"..","public",
"index.html"));
});
app.get("/api/getdata",async (req,res)=>{
     const todos=await Todo.find();
     res.json(todos);
});
app.post("/api/adddata",async (req,res)=>{
     const todo=await new Todo(req.body);
     todo.save();
     res.json(todo);
});
app.delete("/api/deldata/:id",async (req,res)=>{
 await Todo.findByIdAndDelete(req.params.id);
     res.json({message:"deleted"});
});


