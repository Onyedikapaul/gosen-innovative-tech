export function locationUpdateEmailTemplate({
  trackingNumber,
  receiverName,
  location,
  status,
  productName,
  arrival,
}) {

  const site_name = process.env.SITE_NAME;

  return {
    subject: `Shipment Update — Your Package is Now in ${location} | Tracking: ${trackingNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">

        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0a4649; font-size: 24px; margin: 0;">${site_name}</h1>
          <p style="color: #666; margin: 5px 0 0;">Shipment Location Update</p>
        </div>

        <div style="background: #0a4649; color: #fff; padding: 20px; border-radius: 6px; text-align: center; margin-bottom: 24px;">
          <p style="margin: 0 0 6px; font-size: 13px; opacity: 0.8;">TRACKING NUMBER</p>
          <h2 style="margin: 0; font-size: 28px; letter-spacing: 2px;">${trackingNumber}</h2>
        </div>

        <p style="font-size: 15px;">Dear <strong>${receiverName || "Valued Customer"}</strong>,</p>
        <p style="font-size: 15px; line-height: 1.6;">
          Your shipment has been updated. Here is the latest information:
        </p>

        <div style="background: #f9f9f9; border-left: 4px solid #0a4649; padding: 16px 20px; border-radius: 4px; margin: 20px 0;">
          <p style="margin: 0 0 8px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">Current Location</p>
          <p style="margin: 0; font-size: 22px; font-weight: 700; color: #0a4649;">${location}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 8px; color: #666; width: 40%;">Product</td>
            <td style="padding: 10px 8px; font-weight: 600;">${productName || "—"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 8px; color: #666;">Status</td>
            <td style="padding: 10px 8px;">
              <span style="background: ${statusColor(status)}; color: #fff; padding: 3px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
                ${status || "Processing"}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 8px; color: #666;">Expected Arrival</td>
            <td style="padding: 10px 8px; font-weight: 600;">${arrival ? new Date(arrival).toLocaleDateString() : "—"}</td>
          </tr>
        </table>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.SITE_URL}/tracking.html?t=${trackingNumber}"
             style="background: #0a4649; color: #fff; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-size: 15px; font-weight: 600;">
            Track Your Shipment
          </a>
        </div>

        <p style="font-size: 13px; color: #888; line-height: 1.6;">
          You can track your shipment at any time by visiting our website and entering your tracking number: <strong>${trackingNumber}</strong>
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">

       <div style="text-align: center; font-size: 12px; color: #aaa;">
          <p style="margin: 4px 0;">${site_name}</p>
          <p style="margin: 4px 0;">${process.env.SITE_ADDRESS}</p>
          <p style="margin: 4px 0;">${process.env.SITE_EMAIL}</p>
        </div>
      </div>
    `,
  };
}

function statusColor(status) {
  const map = {
    Arrived: "#27ae60",
    Shipped: "#8e44ad",
    "On Transit": "#2980b9",
    Processing: "#f39c12",
    "On Hold": "#e74c3c",
  };
  return map[status] || "#888";
}
