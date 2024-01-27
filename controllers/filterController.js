const filterServices = require("../services/FilterServices")
 const filterController = {}

 //filter on the basis of prize range and brands
filterController.filter = async(req , res)=>{
    console.log( req.query);
    const {lowPrize , highPrize , brand} = req.query;

    if(lowPrize==undefined&&highPrize == undefined &&brand ==undefined){
        res.send({
            status:"err",
            msg:"lowPrize ,highPrize and brand is required field "
        })
    }else{
           
       const filteredData =  await filterServices.filter(lowPrize , highPrize , brand);

       res.send(filteredData)
    }
}

module.exports = filterController