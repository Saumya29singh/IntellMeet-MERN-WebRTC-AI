exports.notFound=(req,res,next)=>{

res.status(404);

throw new Error("Route Not Found");

};

exports.errorHandler=(err,req,res,next)=>{

res.status(res.statusCode||500);

res.json({

message:err.message

});

};
