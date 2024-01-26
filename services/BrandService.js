const Brand = require("../model/Brand")

const BrandService = {};

BrandService.add = async(name , description , foundedYear ,logoUrl )=>{
if(description == null && foundedYear == null){
    console.log( description , foundedYear , "in brandservice")
    return await Brand.create({name ,logoUrl} )
}
if(description == null && foundedYear != null){
    return await Brand.create({name,logoUrl,foundedYear})
}
if(description != null && foundedYear == null){
    return await Brand.create({name,logoUrl,description})
}else{
    return await Brand.create({name,logoUrl,description,foundedYear})   
}

}

BrandService.findBrand = async(name)=>{
   return await Brand.findOne({name})
}
module.exports = BrandService