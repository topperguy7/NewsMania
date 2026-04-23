async function isLogin(req, res){
  try{
    const token = await req.cookies.token;

    if(!token){
      return res.status(401).json({
        message: "user not logged in"
      });
    };

    res.status(200).json({
      message: "user logged in"
    });
  } catch(err){
    console.error("Error:", err);
    res.status(500).json({
      message: "Server error"
    });
  };
};

module.exports = { isLogin };