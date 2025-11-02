require('dotenv').config()
const express = require('express');
const PORT = process.env.PORT || 9000
const app = express()
const connectDb = require('./config/db')
const router  = require('./src/router/user')
connectDb()
app.use(express.json())

app.use('/api/v1',router)






app.listen(PORT,()=>{
     console.log(`Server is running ON ${PORT}`)
})