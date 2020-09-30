const User =  require("../models/user");
const Category =  require("../models/category");
const { check, validationResult } = require("express-validator");

exports.getCatById = (req,res,next,id)=>{
    Category.find({_id:id}).exec((err,cat)=>{
        if(err || !cat){
            return res.status(400).json({err:"Category Not Found In Database"});
        }
        req.category = cat[0];
          next();
    });
  
}


exports.createCategory = (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
          error: errors.array()[0].msg
        });
      }


    const category = new Category(req.body);
    category.save((err,cat)=>{
        if(err){
            return res.status(400).json({error:"Not Able To Create Category" });
        }

        res.status(200).json({category : cat})
    })

}


exports.getAllCategory = (req,res)=>{
    Category.find().exec((err,cats)=>{
        if(err){
            return res.status(400).json({error:"Can Not Get Any Category"});
        }
        res.status(200).json(cats);
    })
}

exports.getCategory = (req,res)=>{
    
    return res.json(req.category);
}

exports.updateCategory = (req,res)=>{
    const category = req.category;
    
    category.name = req.body.name;
    category.save((err,updateCat)=>{
        if(err){
            res.status(400).json({error:"Cannot Update Category"})
        }

        res.status(200).json(updateCat);
    })
}

exports.deleteCategory = (req,res)=>{
    category = req.category;
    category.remove((err,cat)=>{
        if(err){
            res.status(400).json({error:`Cannot Delete ${cat.name}`});
        }

        res.status(200).json({msg:`${cat.name} Deleted Successfully`});
    })
}