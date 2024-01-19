const express = require("express")
var bodyParser = require('body-parser')
var cors = require("cors");


const app = express()

require("./db/db")


// use routes here 
//  example const UserRoutes = require('./routes/UserRoutes')



app.listen(3210, ()=>{
  console.log("server is running on port : ", 3210)
});