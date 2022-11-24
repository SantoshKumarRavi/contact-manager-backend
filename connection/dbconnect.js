const mongoose = require("mongoose");

const Connection = async (url)=>{
    // console.log(url)
    try {
        await mongoose.connect(url).then(()=>console.log("Connection established with database"))
      
    } catch (error) {
        console.log(error);
    }
}

module.exports = Connection;


