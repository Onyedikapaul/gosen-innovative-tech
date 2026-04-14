import { Resend } from "resend";
import { shipmentEmailTemplate } from "./email-templates/shipmentEmail.js";
import { locationUpdateEmailTemplate } from "./email-templates/locationUpdateEmail.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendShipmentEmail({ to, templateData }) {
  const { subject, html } = shipmentEmailTemplate(templateData);

  await resend.emails.send({
    from: `${process.env.SITE_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
    to,
    subject,
    html,
  });
}


export async function sendLocationUpdateEmail({ to, templateData }) {
  const { subject, html } = locationUpdateEmailTemplate(templateData);

  await resend.emails.send({
    from: `${process.env.SITE_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
    to,
    subject,
    html,
  });
}