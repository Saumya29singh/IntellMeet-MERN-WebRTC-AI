const User=require("../models/User");
const jwt=require("jsonwebtoken");

const generateToken=(id)=>{

    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRE}
    );

};

exports.register=async(req,res)=>{

try{

const {name,email,password}=req.body;

const exists=await User.findOne({email});

if(exists){

return res.status(400).json({
message:"User already exists"
});

}

const user=await User.create({
name,
email,
password
});

res.status(201).json({

_id:user._id,
name:user.name,
email:user.email,
token:generateToken(user._id)

});

}catch(err){

res.status(500).json({message:err.message});

}

};

exports.login=async(req,res)=>{

try{

const {email,password}=req.body;

const user=await User.findOne({email});

if(!user){

return res.status(404).json({
message:"User not found"
});

}

const isMatch=await user.matchPassword(password);

if(!isMatch){

return res.status(401).json({
message:"Invalid Credentials"
});

}

res.json({

_id:user._id,
name:user.name,
email:user.email,
role:user.role,
token:generateToken(user._id)

});

}catch(err){

res.status(500).json({message:err.message});

}

};

exports.getProfile=async(req,res)=>{

const user=await User.findById(req.user.id).select("-password");

res.json(user);

};
