const express = require("express")
var bodyParser = require('body-parser')
var cors = require("cors");

//-------------------------------------------------------
const app = express()
app.use(cors())

require("./db/db")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// -------------------------------router for wake a server------------------
const healthRoute = require("./routes/healthRoute")
app.use("/health",healthRoute)

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


//--------------------------Product-Description------------------
const ProductDescRoute = require("./routes/ProductDescRoute")
app.use("/",ProductDescRoute)

//--------------------------- insert brand------------------
const BrandAdd = require("./routes/BrandAdd");
app.use("/brand",BrandAdd);

//-----------------------password routes------------------------
const PasswordRoutes =  require('./routes/PasswordRoutes');
app.use("/password", PasswordRoutes);


//--------------------filters--------------------
const filterRoute = require("./routes/filterRoute");
app.use("/",filterRoute);

//----------------------Reviews----------------------
const reviewRoute = require("./routes/reviewRoute")
app.use("/review",reviewRoute)

//----------------------searc----------------------
const SearchRoute = require("./routes/SearchRoute")
app.use("/search",SearchRoute)


//----------------------user routes-------------------------
const UserRoutes = require('./routes/UserRoutes')
app.use("/user", UserRoutes)

//---------------------admin routes--------------------
const AdminRoutes =  require('./routes/AdminRoutes')
app.use("/admin", AdminRoutes)


//--------------------product routes-----------------
const ProductRoutes =  require('./routes/ProductRoutes')
app.use("/", ProductRoutes)

//--------------------------checkOut route----------------

const checkOutRoute = require('./routes/checkOutRoute')
app.use("/checkout",checkOutRoute)

app.listen(9999, ()=>{
  console.log("server is running on port : ", 9999)
});