const express=require('express');
const app=express()
const cors=require('cors')
const dotenv=require('dotenv');
const bodyParser = require('body-parser');
const PORT=process.env.PORT || 8080
const DB=require('./DB')
const router=require('./routes/routes.todo')

// middlewares
dotenv.config()
app.use(cors())
app.use(bodyParser.json())

DB.getConnection((err)=>{
    if(!err){
        console.log("DB connected successfully")
    }
})

app.use('/Home',router)

app.listen(PORT,()=>{
    console.log(`server started on http://localhost:${PORT}` )
})

