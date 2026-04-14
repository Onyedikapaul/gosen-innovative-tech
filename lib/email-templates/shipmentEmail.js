export function shipmentEmailTemplate({ trackingNumber, receiverName, productName, status, location, departure, arrival, senderName, description, price }) {

    const Site_name = process.env.SITE_NAME;

  return {
    subject: `Your Shipment is On Its Way — Tracking No: ${trackingNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0a4649; font-size: 24px; margin: 0;">${Site_name}</h1>
          <p style="color: #666; margin: 5px 0 0;">Shipment Notification</p>
        </div>

        <div style="background: #0a4649; color: #fff; padding: 20px; border-radius: 6px; text-align: center; margin-bottom: 24px;">
          <p style="margin: 0 0 6px; font-size: 13px; opacity: 0.8;">TRACKING NUMBER</p>
          <h2 style="margin: 0; font-size: 28px; letter-spacing: 2px;">${trackingNumber}</h2>
        </div>

        <p style="font-size: 15px;">Dear <strong>${receiverName || "Valued Customer"}</strong>,</p>
        <p style="font-size: 15px; line-height: 1.6;">A shipment has been created for you. Here are the details:</p>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 8px; color: #666; width: 40%;">Product</td>
            <td style="padding: 10px 8px; font-weight: 600;">${productName || "—"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 8px; color: #666;">Status</td>
            <td style="padding: 10px 8px; font-weight: 600;">${status || "Processing"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 8px; color: #666;">Current Location</td>
            <td style="padding: 10px 8px; font-weight: 600;">${location || "—"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 8px; color: #666;">Departure</td>
            <td style="padding: 10px 8px; font-weight: 600;">${departure ? new Date(departure).toLocaleDateString() : "—"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 8px; color: #666;">Expected Arrival</td>
            <td style="padding: 10px 8px; font-weight: 600;">${arrival ? new Date(arrival).toLocaleDateString() : "—"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 8px; color: #666;">Sender</td>
            <td style="padding: 10px 8px; font-weight: 600;">${senderName || "—"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 8px; color: #666;">Description</td>
            <td style="padding: 10px 8px;">${description || "—"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 8px; color: #666;">Price</td>
            <td style="padding: 10px 8px; font-weight: 600;">${price || "—"}</td>
          </tr>
        </table>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.SITE_URL}/tracking.html?t=${trackingNumber}"
             style="background: #0a4649; color: #fff; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-size: 15px; font-weight: 600;">
            Track Your Shipment
          </a>
        </div>

        <p style="font-size: 13px; color: #888; line-height: 1.6;">
          You can also track your shipment by visiting our website and entering your tracking number: <strong>${trackingNumber}</strong>
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">

        <div style="text-align: center; font-size: 12px; color: #aaa;">
          <p style="margin: 4px 0;">${Site_name}</p>
          <p style="margin: 4px 0;">${process.env.SITE_ADDRESS}</p>
          <p style="margin: 4px 0;">${process.env.SITE_EMAIL}</p>
        </div>

      </div>
    `,
  };
}