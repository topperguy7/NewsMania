const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authModel = require('../models/auth.model');

async function authSign(req, res){
  try{
    const { username , email , password} = req.body;

    let user = await authModel.findOne({ email });

    if(user){
      return res.status(400).json({
        message: "email already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user = new authModel({
      username,
      email,
      password: hashPassword
    });

    await user.save();

    const token = jwt.sign(
      {id: user._id},
      process.env.JWT_SEC,
      {expiresIn: '1d'}
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      samesite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "user registered successfully",
      user: {id: user._id, username: user.username, email: user.email}
    });
  }
  catch(err){
    console.error("Error:", err.message);
    res.status(500).json({
      message: "server error"
    });
  }
};

async function authLogin(req, res){
  try{
    const { identifier , password } = req.body;

    const user = await authModel.findOne({
      $or: [
        { email: identifier },
        { username: identifier }
      ]
    });

    if(!user){
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    };

    const token = jwt.sign(
      {id: user._id},
      process.env.JWT_SEC,
      { expiresIn: '1d'}
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch(err){
    console.error("Error:", err.message);
    res.status(500).json({
      message: "server error"
    });
  };
};

async function authLogout(req, res){
  try{
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    res.status(200).json({
      message: "logged out successfully"
    });
  } catch(err){
    console.error("Error:", err.message);
    res.status(500).json({
      message: "Server Error"
    });
  };
};

async function authStatus(req, res){
  try{
    const token = req.cookies.token;

    if(!token){
      return res.status(401).json({
        loggedIn: false
      });
    };

    const decoded = jwt.verify(token, process.env.JWT_SEC);

    const user = await authModel.findById(decoded.id).select('-password');

    if(!user){
      return res.status(401).json({
        loggedIn: false
      });
    };
    
    res.status(200).json({
      loggedIn: true
    });
  } catch(err){
    console.error("Error:", err.message);
    res.status(500).json({
      loggedIn: false,
      message: "Invalid Token or Server Error"
    });
  };
};

module.exports = { authSign , authLogin , authLogout , authStatus };