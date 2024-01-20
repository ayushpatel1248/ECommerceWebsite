const mongoose = require('mongoose');

// ******************************add database url below***********************************************

MONGODB_URI = 'mongodb+srv://ayushpatel062004:Gh7ypCDLEPJnuuib@proprogrammers.r6bjbcn.mongodb.net/ECommerce?retryWrites=true&w=majority'                   

mongoose.connect(MONGODB_URI).then(res => {
    console.log("connected to database server successfully")
}).catch(err => {
    console.log("error while connecting  to server")
})
