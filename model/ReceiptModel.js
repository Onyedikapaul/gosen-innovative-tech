import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema(
  {
    receiptNumber: {
      type: String,
      unique: true,
    },
    payer: {
      name: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      country: String,
      zip: String,
      email: String,
    },
    productName: String,
    date: Date,
    price: String,
    description: String,
    agent: {
      name: String,
      phone: String,
    },
  },
  { timestamps: true },
);

const Receipt = mongoose.model("Receipt", receiptSchema);
export default Receipt;
