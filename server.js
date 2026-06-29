require("dotenv").config();

const express=require("express");
const cors=require("cors");
const morgan=require("morgan");
const http=require("http");

const connectDB=require("./config/db");

const authRoutes=require("./routes/authRoutes");

const initializeSocket=require("./socket/socket");

connectDB();

const app=express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/auth",authRoutes);

app.get("/",(req,res)=>{

res.send("IntellMeet Backend Running");

});

const server=http.createServer(app);

initializeSocket(server);

const PORT=process.env.PORT||5000;

server.listen(PORT,()=>{

console.log(`Server running on ${PORT}`);

});
