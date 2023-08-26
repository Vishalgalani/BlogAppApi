const CATEGORY = require('../model/category')

exports.ADDCATEGORY = async function(req, res, next) {
    try {
        req.body.image = req.file.filename 
        if(!req.body.name || !req.body.image){
            throw new Error('please enter valid field')
        }
        const data = await CATEGORY.create(req.body)
        res.status(201).json({
            status : "sucessfully",
            message : "content is added",
            data : data
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
        
    }
  };

  exports.ALLCATEGORY = async function(req, res, next) {
    try{
        const data = await CATEGORY.find()
        res.status(200).json({
            status : "sucessfully",
            message : "data is found",
            data : data
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
        
    }
  };

  exports.EDITCATEGORY = async function(req, res, next) {
    try{
        if(req.file){
        req.body.image = req.file.filename
        } 
        await CATEGORY.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json({
            status : "sucessfully",
            message : "content is updated",
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
        
    }
  };

  exports.DELETECATEGORY = async function(req, res, next) {
    try{
        await CATEGORY.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status : "sucessfully",
            message : "content is deleted",
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
        
    }
  };