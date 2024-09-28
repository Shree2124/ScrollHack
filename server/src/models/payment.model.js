import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  stripe_session_id: {
    type: String,
    required: true, 
  },
  payment_status: {
    type: String,
    required: true, 
  },
  amount_total: {
    type: Number,
    required: true, 
  },
  currency: {
    type: String,
    required: true, 
  },
  customer_email: {
    type: String, 
    default: null, 
  },
  success_url: {
    type: String,
    required: true, 
  },
  cancel_url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{
  timestamps: true
});

export const Payment = mongoose.model("Payment", paymentSchema);
