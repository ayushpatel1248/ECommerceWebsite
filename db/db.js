const mongoose = require('mongoose');

// ******************************add your own database url below***********************************************

MONGODB_URI = ''                   

mongoose.connect(MONGODB_URI).then(res => {
    console.log("connected to database server successfully")
}).catch(err => {
    console.log("error while connecting  to server")
})
