import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import Consignment from "../model/ConsignmentModel.js";
import generateTrackingNumber from "../utils/generateTrackingNumber.js";

const ConsignmentRouter = express.Router();

// CREATE
// CREATE
ConsignmentRouter.post("/", checkAuth, async (req, res) => {
  try {
    const {
      senderName,
      senderPhone,
      senderCompany,
      senderAddress,
      senderCity,
      senderState,
      senderCountry,
      senderZip,
      senderEmail,
      receiverName,
      receiverPhone,
      receiverCompany,
      receiverAddress,
      receiverCity,
      receiverState,
      receiverCountry,
      receiverZip,
      receiverEmail,
      productName,
      departure,
      arrival,
      price,
      description,
      location,
      status,
    } = req.body;

    const trackingNumber = generateTrackingNumber();

    const consignment = new Consignment({
      trackingNumber,
      sender: {
        name: senderName,
        phone: senderPhone,
        company: senderCompany,
        address: senderAddress,
        city: senderCity,
        state: senderState,
        country: senderCountry,
        zip: senderZip,
        email: senderEmail,
      },
      receiver: {
        name: receiverName,
        phone: receiverPhone,
        company: receiverCompany,
        address: receiverAddress,
        city: receiverCity,
        state: receiverState,
        country: receiverCountry,
        zip: receiverZip,
        email: receiverEmail,
      },
      productName,
      departure,
      arrival,
      price,
      description,
      location,
      status,
    });

    await consignment.save();
    return res.json({ ok: true, message: "Consignment created", consignment });
  } catch (err) {
    console.error("createConsignment error:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

// GET ALL
ConsignmentRouter.get("/", checkAuth, async (req, res) => {
  try {
    const consignments = await Consignment.find().sort({ createdAt: -1 });
    return res.json({ ok: true, consignments });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

// GET ONE by tracking number or ID
ConsignmentRouter.get("/:id", async (req, res) => {
  try {
    const consignment = await Consignment.findOne({
      $or: [
        { _id: req.params.id.match(/^[a-f\d]{24}$/i) ? req.params.id : null },
        { trackingNumber: req.params.id },
      ],
    });

    if (!consignment)
      return res.status(404).json({ ok: false, message: "Not found" });
    return res.json({ ok: true, consignment });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

// ConsignmentRouter.put("/:id", checkAuth, async (req, res) => {
//   try {
//     const consignment = await Consignment.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { returnDocument: "after" },
//     );
//     if (!consignment)
//       return res.status(404).json({ ok: false, message: "Not found" });
//     return res.json({ ok: true, message: "Updated", consignment });
//   } catch (err) {
//     return res.status(500).json({ ok: false, message: "Server error" });
//   }
// });

// UPDATE
ConsignmentRouter.put("/:id", checkAuth, async (req, res) => {
  try {
    const {
      senderName, senderPhone, senderCompany,
      senderAddress, senderCity, senderState,
      senderCountry, senderZip, senderEmail,
      receiverName, receiverPhone, receiverCompany,
      receiverAddress, receiverCity, receiverState,
      receiverCountry, receiverZip, receiverEmail,
      productName, departure, arrival,
      price, description, location, status,
    } = req.body;

    const updated = await Consignment.findByIdAndUpdate(
      req.params.id,
      {
        ...(senderName !== undefined && {
          sender: {
            name: senderName, phone: senderPhone, company: senderCompany,
            address: senderAddress, city: senderCity, state: senderState,
            country: senderCountry, zip: senderZip, email: senderEmail,
          },
        }),
        ...(receiverName !== undefined && {
          receiver: {
            name: receiverName, phone: receiverPhone, company: receiverCompany,
            address: receiverAddress, city: receiverCity, state: receiverState,
            country: receiverCountry, zip: receiverZip, email: receiverEmail,
          },
        }),
        ...(productName !== undefined && { productName }),
        ...(departure !== undefined && { departure }),
        ...(arrival !== undefined && { arrival }),
        ...(price !== undefined && { price }),
        ...(description !== undefined && { description }),
        ...(location !== undefined && { location }),
        ...(status !== undefined && { status }),
      },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updated)
      return res.status(404).json({ ok: false, message: "Not found" });

    return res.json({ ok: true, consignment: updated });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

// DELETE
ConsignmentRouter.delete("/:id", checkAuth, async (req, res) => {
  try {
    await Consignment.findByIdAndDelete(req.params.id);
    return res.json({ ok: true, message: "Deleted" });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

export default ConsignmentRouter;
