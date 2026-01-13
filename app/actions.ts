"use server";

import sgMail from "@sendgrid/mail";

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function subscribeAction(formData: FormData, captchaToken: string | null) {
  const email = formData.get("email") as string;
  const intent = formData.get("intent") as string;

  if (!email || !intent) {
    return { error: "Email and intent are required." };
  }

  if (!captchaToken) {
    return { error: "reCAPTCHA validation failed." };
  }

  // Validate reCAPTCHA
  try {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaToken}`,
      { method: "POST" }
    );
    const data = await response.json();

    if (!data.success) {
      return { error: `reCAPTCHA validation failed` };
    }
  } catch (error) {
    return { error: "Internal server error during validation." };
  }

  // Send Email via SendGrid
  if (!process.env.SENDGRID_API_KEY) {
    return { success: true, message: "Subscribed (Email skipped)" };
  }

  const msg = {
    to: process.env.NOTIFICATION_EMAIL || "admin@gather.com",
    from: process.env.SENDER_EMAIL || "noreply@gather.com",
    subject: "New Coming Soon Subscription",
    text: `New subscriber: ${email}\nIntent: ${intent}`,
    html: `<p>New subscriber: <strong>${email}</strong></p><p>Intent: ${intent}</p>`,
  };

  try {
    await sgMail.send(msg);
    return { success: true, message: "Thank you for subscribing!" };
  } catch (error: any) {
    return { error: "Failed to send email. Please check your SendGrid configuration." };
  }
}