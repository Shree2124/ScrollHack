import Razorpay from "razorpay";

export const DB_NAME = "Elearning"
export const instance = new Razorpay({
    key_id: process.env.Razorpay_Key,
    key_secret: process.env.Razorpay_Secret,
  });