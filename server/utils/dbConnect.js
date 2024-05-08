const mongoose = require("mongoose")

const dbConnect = async()=>{
try {
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("db connected.."))
    .catch(error => console.log(error))
    
} catch (error) {
    console.log("error in connecting database")
}
}

module.exports = dbConnect;