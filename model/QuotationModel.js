import mongoose from "mongoose";

const QuotationSchema = new mongoose.Schema(
  {
    quotationNumber: { type: String, required: true, unique: true },

    customer: {
      name: { type: String, default: "" },
      phone: { type: String, default: "" },
      email: { type: String, default: "" },
    },

    pickup: { type: String, default: "" },
    delivery: { type: String, default: "" },

    packageDescription: { type: String, default: "" },
    weight: { type: String, default: "" },

    price: { type: String, default: "" },
    currency: { type: String, default: "USD" },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },

    date: { type: Date, default: Date.now },
    notes: { type: String, default: "" },

    agent: {
      name: { type: String, default: "" },
      phone: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

export default mongoose.model("Quotation", QuotationSchema);
