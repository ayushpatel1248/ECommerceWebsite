const express = require("express")
const BrandService = require("../services/BrandService")
const AddBrandController = {}

AddBrandController.add = async(req ,res)=>{

    const {name , description , foundedYear ,logoUrl } = req.body;
    
    //# TO DO => authorization of admin is remain , abhi user bhi is ko access kar pa raha hoga
    try{
        if(name == null && logoUrl==null){
            res.send({
                status: "err",
                msg:"name of brand and logoUrl is required field ||||| description and foundedYear is additional ",
                data : null
            })
        }else{
            if(foundedYear==null || typeof(foundedYear) == "number"){
                const foundBrand = await BrandService.findBrand(name)
                if(foundBrand == null){
                   const addBand  = await BrandService.add(name,description,foundedYear,logoUrl); 
                   res.send({
                    status : "ok",
                    msg:"band add sucesfully",
                    data : addBand
                   })
                }else{
                    res.send({
                        status: "err",
                        msg:"Brand already exist with entered brand name",
                        data : null
                    })
                }
            }else{
                res.send({
                    status:"err",
                    msg:"foundedYear should be number",
                    data:null
                })
            }
           
            
        }
    }catch(err){
        res.send({
            status: "err",
            msg:"err in server side at add brand controller",
            data : err
        })
    }


}

module.exports = AddBrandController