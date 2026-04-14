import mongoose from "mongoose";

const consignmentSchema = new mongoose.Schema(
  {
    trackingNumber: {
      type: String,
      unique: true,
    },
    sender: {
      name: String, phone: String, company: String,
      address: String, city: String, state: String,
      country: String, zip: String, email: String,
    },
    receiver: {
      name: String, phone: String, company: String,
      address: String, city: String, state: String,
      country: String, zip: String, email: String,
    },
    productName: String,
    departure: Date,
    arrival: Date,
    price: String,
    description: String,
    location: String,
    status: {
      type: String,
      enum: ["Processing", "On Hold", "On Transit", "Shipped", "Arrived"],
      default: "Processing",
    },
  },
  { timestamps: true },
);

const Consignment = mongoose.model("Consignment", consignmentSchema);
export default Consignment;