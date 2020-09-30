
const Porduct = require("../models/product");
const formidable = require("formidable");
const fs =  require("fs");

const { IncomingForm } = require('formidable');

const _= require("lodash");
exports.getProductById = (req,res,next,id) =>{
Porduct.findById({_id:id}).populate("category")
.exec((err,product)=>{
    if(err){
        res.status(400).json({error:"No Product Found"});
    }
    if(product==undefined){
          res.status(400).json({error:"No Product Found2"});

    }
    
    req.product = product ;

next();

});


}




exports.createProduct = (req,res)=>{

   // let form =  new formidable.InocmingForm();
   const form = new IncomingForm();

    form.keepExtensions = true;
         form.parse(req,(err,fields ,file)=>{
             if(err){
                  return res.status(400).json({
                  error:"problem in image"
                    })
             }


            // restriction
            const {price,name,description,category,stock} =fields;


            if(
                !name||
                !description ||
                !price ||
                !category ||
                !stock
            ){
                return res.status(400).json({
                  error:"all fields are needed to create product"
                    });
            }

            //

            let product = new Porduct(fields);

            //file//
            if(!file.photo){
                 return res.status(400).json({
                    error:"Photo Required"
                })
            }

            if(file.photo){
                
                 if(file.photo.size > 500200 && file.photo.size < 50000){
                    return res.status(400).json({
                    error:"max image size 500kb min 49kb"
                })
            }

            
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type
     
        //db//
    
            product.save((err,product)=>{
                if(err){
                    console.log(err)
                   
                   return res.status(400).json({
                   error:"saving data failed",
                   
                 })

            }       product.photo = undefined;
                    return res.status(200).json({produc: product});
        })

    }})

}

exports.deleteProduct = (req,res)=>{
    let product = req.product;
    console.log(product);
    product.remove((err,product)=>{
        if(err){
            res.status(400).json({error: `problem occur while deleteing ${product.name}`})
        }
        res.json({msg: `${product.name} deleted successfully`});
    })
}

exports.getProduct = (req,res,next)=>{

    return res.json(req.product);

}

exports.updateProduct = (req,res)=>{
     const form = new IncomingForm();

    form.keepExtensions = true;
         form.parse(req,(err,fields ,file)=>{
             if(err){
                  return res.status(400).json({
                  error:"problem in image"
                    })
             }
console.log(fields);

            // restriction
            const {price,name,description,category,stock} =fields;


           

            //updation
            let product = req.product;
             product = _.extend(product,fields);
             product.photo.data =req.product.photo.data;
             product.photo.contentType =req.product.photo.contentType;

          //file//
        /*    if(!file.photo){
                 return res.status(400).json({
                    error:"Photo Required"
                })
            }

            if(file.photo){
                
                if(file.photo.size > 500200 && file.photo.size < 50000){
                    return res.status(400).json({
                    error:"max image size 500kb min 49kb"
                })
            }

            
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type
        }
     */
        //db//
    
           
    
    product.save((err,product)=>{
        if(err){
           console.log(err);
           return res.status(400).json({
           error:"update data failed",
           
         })

    }       product.photo = undefined;
            return res.status(200).json({produc: product});
})






})







}

exports.getAllProduct = (req,res)=>{
    let limit = req.query.limit ? parseint(req.query.limit) : 8;
    let sortBy= req.query.sortBy ? req.query.sortBy : "_id";
 

    Porduct.find()
    .select("-photo")
    .populate("category")
    .limit(limit)
    .sort([[sortBy,"asc"]])
    .exec((err,products)=>{
        if(err||!products){
            res.status(400).json({error:"No Product Found"});
        }
         res.json(products)
    })


}



exports.photo = (req,res,next)=>{


        if(req.product.photo.data){
            res.set("Content-Type",req.product.photo.contentType);
            return res.send(req.product.photo.data);


        }
        next();
} 

exports.updateStock = (req,res,next)=>{
    let itemsopr = req.body.products.map(product =>{
        return {
            updateOne:{
                filter : {"_id":product._id},
                update : {$inc : {stock: -product.count,sold:+product.count}}
            }
        }
    })
    Product.bulkWrite(itemsopr ,{},(err,products)=>{
        if(err){
            return res.status(400).json({error: " bulk operation failed"})
        }
        next();

    });



}

exports.allUniqueCategory = (req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err || !category){
            res.json({error : "an error occur while geting category"});
        }
        res.json(category);
    })
}