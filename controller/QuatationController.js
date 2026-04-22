import express from "express";
import Quotation from "../model/QuotationModel.js";
import { checkAuth } from "../middleware/checkAuth.js";

const QuotationRouter = express.Router();

// Generate unique quotation number
function generateQuotationNumber() {
  return "QT-" + Math.floor(100000000 + Math.random() * 900000000).toString();
}

// GET ALL
QuotationRouter.get("/", checkAuth, async (req, res) => {
  try {
    const quotations = await Quotation.find().sort({ createdAt: -1 });
    return res.json({ ok: true, quotations });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

// GET ONE (by _id or quotationNumber)
QuotationRouter.get("/:id", checkAuth, async (req, res) => {
  try {
    const quotation = await Quotation.findOne({
      $or: [
        { _id: req.params.id.match(/^[a-f\d]{24}$/i) ? req.params.id : null },
        { quotationNumber: req.params.id },
      ],
    });
    if (!quotation)
      return res.status(404).json({ ok: false, message: "Not found" });
    return res.json({ ok: true, quotation });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

// CREATE
QuotationRouter.post("/", checkAuth, async (req, res) => {
  try {
    const {
      customerName, customerPhone, customerEmail,
      pickup, delivery,
      packageDescription, weight,
      price, currency,
      status, date, notes,
      agentName, agentPhone,
    } = req.body;

    // Generate unique quotation number
    let quotationNumber;
    let exists = true;
    while (exists) {
      quotationNumber = generateQuotationNumber();
      exists = await Quotation.findOne({ quotationNumber });
    }

    const quotation = await Quotation.create({
      quotationNumber,
      customer: {
        name: customerName || "",
        phone: customerPhone || "",
        email: customerEmail || "",
      },
      pickup: pickup || "",
      delivery: delivery || "",
      packageDescription: packageDescription || "",
      weight: weight || "",
      price: price || "",
      currency: currency || "USD",
      status: status || "Pending",
      date: date || Date.now(),
      notes: notes || "",
      agent: {
        name: agentName || "",
        phone: agentPhone || "",
      },
    });

    return res.status(201).json({ ok: true, quotation });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

// UPDATE
QuotationRouter.put("/:id", checkAuth, async (req, res) => {
  try {
    const {
      customerName, customerPhone, customerEmail,
      pickup, delivery,
      packageDescription, weight,
      price, currency,
      status, date, notes,
      agentName, agentPhone,
    } = req.body;

    const updated = await Quotation.findByIdAndUpdate(
      req.params.id,
      {
        ...(customerName !== undefined && {
          customer: {
            name: customerName,
            phone: customerPhone,
            email: customerEmail,
          },
        }),
        ...(pickup !== undefined && { pickup }),
        ...(delivery !== undefined && { delivery }),
        ...(packageDescription !== undefined && { packageDescription }),
        ...(weight !== undefined && { weight }),
        ...(price !== undefined && { price }),
        ...(currency !== undefined && { currency }),
        ...(status !== undefined && { status }),
        ...(date !== undefined && { date }),
        ...(notes !== undefined && { notes }),
        ...(agentName !== undefined && {
          agent: { name: agentName, phone: agentPhone },
        }),
      },
      { returnDocument: "after", runValidators: true }
    );

    if (!updated)
      return res.status(404).json({ ok: false, message: "Not found" });
    return res.json({ ok: true, quotation: updated });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

// DELETE
QuotationRouter.delete("/:id", checkAuth, async (req, res) => {
  try {
    const deleted = await Quotation.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ ok: false, message: "Not found" });
    return res.json({ ok: true, message: "Deleted" });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

export default QuotationRouter;