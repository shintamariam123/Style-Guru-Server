const products = require('../models/productModel')

exports.getAllProductsController = async (req,res)=>{
   try{
    const result = await products.find()
    res.status(200).json(result)
   }catch(err){
    res.status(401).json(err)
   }
}

exports.getAProduct = async (req,res)=>{
   const {id} = req.params
   try{
      const item = await products.findOne({id})
      res.status(200).json(item)
   }catch(err){
      res.status(401).json(err)
   }
}