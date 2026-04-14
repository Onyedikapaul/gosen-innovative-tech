import express from "express";
import Consignment from "../model/ConsignmentModel.js";

const publicRouter = express.Router();

// Public tracking endpoint - no auth required
publicRouter.get("/consignments/track/:trackingNumber", async (req, res) => {
  try {
    const consignment = await Consignment.findOne({
      trackingNumber: req.params.trackingNumber,
    });

    if (!consignment)
      return res
        .status(404)
        .json({ ok: false, message: "Consignment not found" });

    return res.json({ ok: true, consignment });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

export default publicRouter;
