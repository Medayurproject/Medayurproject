const jwt = require("jsonwebtoken");

const adminLogin = async (req,res)=>{

  const { email, password } = req.body;

  if(
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ){

    const token = jwt.sign(
      { role:"admin" },
      process.env.JWT_SECRET,
      { expiresIn:"7d" }
    );

    return res.json({
      success:true,
      token
    });
  }

  res.status(401).json({
    success:false,
    message:"Invalid Credentials"
  });

};

module.exports = { adminLogin };