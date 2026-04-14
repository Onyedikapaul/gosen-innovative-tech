import express from "express";
import Receipt from "../model/ReceiptModel.js";
import { checkAuth } from "../middleware/checkAuth.js";

const ReceiptRouter = express.Router();

// Generate receipt number
function generateReceiptNumber() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

// GET ALL
ReceiptRouter.get("/", checkAuth, async (req, res) => {
  try {
    const receipts = await Receipt.find().sort({ createdAt: -1 });
    return res.json({ ok: true, receipts });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

// GET ONE
ReceiptRouter.get("/:id", checkAuth, async (req, res) => {
  try {
    const receipt = await Receipt.findOne({
      $or: [
        { _id: req.params.id.match(/^[a-f\d]{24}$/i) ? req.params.id : null },
        { receiptNumber: req.params.id },
      ],
    });
    if (!receipt)
      return res.status(404).json({ ok: false, message: "Not found" });
    return res.json({ ok: true, receipt });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

// CREATE
ReceiptRouter.post("/", checkAuth, async (req, res) => {
  try {
    const {
      payerName, payerPhone, payerAddress,
      payerCity, payerState, payerCountry,
      payerZip, payerEmail,
      productName, date, price, description,
      agentName, agentPhone,
    } = req.body;

    // Generate unique receipt number
    let receiptNumber;
    let exists = true;
    while (exists) {
      receiptNumber = generateReceiptNumber();
      exists = await Receipt.findOne({ receiptNumber });
    }

    const receipt = await Receipt.create({
      receiptNumber,
      payer: {
        name: payerName,
        phone: payerPhone,
        address: payerAddress,
        city: payerCity,
        state: payerState,
        country: payerCountry,
        zip: payerZip,
        email: payerEmail,
      },
      productName,
      date,
      price,
      description,
      agent: {
        name: agentName,
        phone: agentPhone,
      },
    });

    return res.status(201).json({ ok: true, receipt });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

// UPDATE
ReceiptRouter.put("/:id", checkAuth, async (req, res) => {
  try {
    const {
      payerName, payerPhone, payerAddress,
      payerCity, payerState, payerCountry,
      payerZip, payerEmail,
      productName, date, price, description,
      agentName, agentPhone,
    } = req.body;

    const updated = await Receipt.findByIdAndUpdate(
      req.params.id,
      {
        ...(payerName !== undefined && {
          payer: {
            name: payerName, phone: payerPhone, address: payerAddress,
            city: payerCity, state: payerState, country: payerCountry,
            zip: payerZip, email: payerEmail,
          },
        }),
        ...(productName !== undefined && { productName }),
        ...(date !== undefined && { date }),
        ...(price !== undefined && { price }),
        ...(description !== undefined && { description }),
        ...(agentName !== undefined && {
          agent: { name: agentName, phone: agentPhone },
        }),
      },
      { returnDocument: "after", runValidators: true }
    );

    if (!updated)
      return res.status(404).json({ ok: false, message: "Not found" });
    return res.json({ ok: true, receipt: updated });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

// DELETE
ReceiptRouter.delete("/:id", checkAuth, async (req, res) => {
  try {
    const deleted = await Receipt.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ ok: false, message: "Not found" });
    return res.json({ ok: true, message: "Deleted" });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

export default ReceiptRouter;