const jwt = require('jsonwebtoken');

async function checkToken(req, res, next){
  try{
    const token = req.cookies.token;

    if(!token){
      return res.status(401).json({
        message: "log in to use this feature"
      });
    };

    const decoded = jwt.verify(token, process.env.JWT_SEC);

    req.user = decoded;

    next();
  } catch(err){
    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Session expired, please login again" });
    };

    console.error("Error:", err.message);
    res.status(500).json({
      message: "Middleware Error"
    });
  };
};

module.exports = { checkToken };