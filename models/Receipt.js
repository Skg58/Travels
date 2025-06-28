import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema({
  email: { type: String, required: true },
  travelDate:Date,
  Designation:String,
  pack:String,
  amount: { type: Number, required: true },
  passengers : Array,
  paymentId: String,
  orderId: String,
  signature: String,

}, { timestamps: true });

export default mongoose.models.Receipt || mongoose.model('Receipt', receiptSchema);
