const joi = require("joi");
const ProductServices = require("../services/ProductsService");
const SearchController ={}

const schema = joi.object({
    search : joi.string().required()
})
SearchController.search = async (req,res)=>{
    const {search} = req.body;
    try{
        await schema.validateAsync({search})
        const productsByName = await ProductServices.getProductByName(search);
        res.send(productsByName)
    }catch(err){
        res.send({
            status:"err",
            msg:err.message,
            data:err
        })
    }

}

module.exports = SearchController