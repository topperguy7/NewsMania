async function checkLogin(req, res, next){
  try{
    const token = req.cookies.token;

    if(!token){
      return res.status(401).json({
        message: "login before to log out"
      });
    };

    next();
  } catch(err){
    console.error("Error:", err.message);
    res.status(500).json({
      message: "Auth Middleware Error"
    });
  };
};

module.exports = { checkLogin };