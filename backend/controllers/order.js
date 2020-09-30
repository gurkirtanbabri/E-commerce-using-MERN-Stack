const Order = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id).populate("user","_id name adderss")
  .exec((err,order)=>{
     if(err){
          return res.status(400).json({error:"an error occur while getting Order"});
      } 
      if(!order){
          return res.status.json({error:"no order found"});

      }
      req.order = order;
      next();
  })
};

exports.createOrder = (req,res)=>{
    
    const order = new Order(req.body.order);
    
    order.save((err,order)=>{
          if(err){
          return res.status(400).json({error:"an error occur while creating Order"});
      }
      res.json(order);
    })
}
exports.getAllOrders = (req,res)=>{

    Order.find()
    .populate("user","_id name adderss").exec((err,orders)=>{
        if(err){
          return res.status(400).json({error:"no  Order founds"});
      }
     res.json(orders);
    })
}





exports.getResOrders = (req,res)=>{

    Order.find({status:"recieved"})
    .populate("user","_id name adderss").exec((err,orders)=>{
        if(err){
          return res.status(400).json({error:"no  Order founds"});
      }
     res.json(orders);
    })
}





exports.getCanOrders = (req,res)=>{

    Order.find({status:"cancelled"})
    .populate("user","_id name adderss").exec((err,orders)=>{
        if(err){
          return res.status(400).json({error:"no  Order founds"});
      }
     res.json(orders);
    })
}



exports.getProOrders = (req,res)=>{

    Order.find({status:"processing"})
    .populate("user","_id name adderss").exec((err,orders)=>{
        if(err){
          return res.status(400).json({error:"no  Order founds"});
      }
     res.json(orders);
    })
}



exports.getDelOrders = (req,res)=>{

    Order.find({status:"Delivered"})
    .populate("user","_id name adderss").exec((err,orders)=>{
        if(err){
          return res.status(400).json({error:"no  Order founds"});
      }
     res.json(orders);
    })
}









exports.getOrderStatus = (req,res)=>{
    Order.find({user: req.profile._id}).exec((err,orders)=>{
        if(err){
          return res.status(400).json({error:"no  Order founds"});
      }
     res.json(orders);
    })
    
}
exports.updateStatus = (req,res)=>{
    console.log(req.body);
    Order.update(
        {_id:req.body.orderId},
        {$set:{status:req.body.status}},
        (err,order)=>{
             if(err){
          return res.status(400).json({error:"cannot cahnge order status"});
      }
      res.json(order);
        }
        )
}