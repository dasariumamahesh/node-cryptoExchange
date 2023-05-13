const express = require('express')
const app = express()
app.use(express.json())
const db = require('./db/mssql')
const routes = require('./routes/routes')
require('dotenv').config()

app.get('/test',(req,res)=>res.send("Test route working"))
app.use("/", routes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on Port: ${process.env.PORT}`)
})