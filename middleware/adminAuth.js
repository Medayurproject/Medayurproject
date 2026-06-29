const jwt = require("jsonwebtoken");

const protectAdmin = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required."
      });
    }

    // Accepts either:
    // Authorization: Bearer <token>
    // or
    // Authorization: <token>

    let token = authHeader;

    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Make decoded user available to next middleware/routes
    req.admin = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token"
    });

  }

};

module.exports = protectAdmin;