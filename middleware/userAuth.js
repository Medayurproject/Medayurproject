const jwt = require("jsonwebtoken");

const protectUser = (req,res,next)=>{

 const token = req.headers.authorization;

 if(!token){

   return res.status(401).json({
     message:"No Token"
   });
 }

 try{

   const decoded =
   jwt.verify(token, process.env.JWT_SECRET);

   req.user = decoded.id;

   next();

 }

 catch(error){

   return res.status(401).json({
     message:"Invalid Token"
   });
 }

};

module.exports = protectUser;