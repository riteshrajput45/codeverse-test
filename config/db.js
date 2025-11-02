const mongoose  = require('mongoose');

const connectDb = async()=>{
    
   try {
     await mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DB_NAME}`)
     console.log("Database Connected")
   } catch (error) {
      console.log(error.stack)
   }
    
}

module.exports = connectDb