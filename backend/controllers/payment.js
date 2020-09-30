var braintree = require("braintree");

var gateway = braintree.connect({
  environment:  braintree.Environment.Sandbox,
  merchantId:   'mrzfcjfhzsprgjj3',
  publicKey:    'm9f2wwtwgy6266s7',
  privateKey:   'd5b4735bbcaa36447b31ae96be7fa7ec'
});
exports.gettoken = (req,res)=>{


    gateway.clientToken.generate({
    }, function (err, response) {
      if(err){
          res.status(500).json(err);
      }else{
        
          res.status(400).json({ct:response.clientToken});
      }
    });
}



exports.processPayment = (req,res)=>{
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amount = req.body.amount;
    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {

if(err){
    res.status(500).json(err);

}else{
    res.send(result)
}

      });

    
    
}