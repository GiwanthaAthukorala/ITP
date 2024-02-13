const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bankname:{
    type:String,
    required:true,
},
paymentmethod:{
    type:String,
    required:true
}
 
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
