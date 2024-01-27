const express = require("express")
var bodyParser = require('body-parser')
var cors = require("cors");

//-------------------------------------------------------
const app = express()
app.use(cors())

require("./db/db")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//-----------------------Register Route----------------------------------------
const UserRegrestrationRoute = require("./routes/UserRegrestrationRoute")
app.use("/",UserRegrestrationRoute)

//----------------------------Login Route----------------------------

const UserLoginRoute = require("./routes/UserLoginRoute")
app.use("/",UserLoginRoute)

//-----------------------Cart Route---------------------------------
const CartRoutes = require('./routes/CartRoutes')
app.use("/cart", CartRoutes)

//--------------------------get products ----------------------
const getProductsRoute = require("./routes/getProductsRoute")
app.use("/",getProductsRoute)

//--------------------------- insert brand------------------
const BrandAdd = require("./routes/BrandAdd");
app.use("/",BrandAdd);

//-----------------------password routes------------------------
const PasswordRoutes =  require('./routes/PasswordRoutes');
app.use("/password", PasswordRoutes);


//--------------------filters--------------------
const filterRoute = require("./routes/filterRoute");
app.use("/",filterRoute);


app.listen(9999, ()=>{
  console.log("server is running on port : ", 9999)
});