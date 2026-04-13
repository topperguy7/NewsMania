const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
]);

async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGO);
    console.log("database connected");
  }
  catch(err){
    console.error("Error:", err);
    process.exit(1);
  };
};

module.exports = connectDB;