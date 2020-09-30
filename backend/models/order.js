const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
  {
    products: [],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status:{
      type:String,
      default:"recieved",
      enum:["cancelled","Delivered","Shipped","processing","recieved"]
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Order", OrderSchema);