import { Request, Response } from "express";
import { sendEmail } from "../../utils/sendEmail";

export const sendingMail = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({ success: false, message: "Email is required." });


  // Mail contents
  const promoCode = "WELCOME10";
  const subject = "Welcome to Our Newsletter!";
  const html = `
    <h1>Welcome to Restaurant</h1>
    <p>Thank you for subscribing to our newsletter!</p>
    <p>Your promo code: <strong>${promoCode}</strong></p>
    <p>Use this promo code to enjoy 10% off your next purchase.</p>
  `;

  try {
    const emailSent = await sendEmail({ to: email, subject, html })
    if (emailSent)
      return res.status(200).json("Email sent successfully");
    else
      throw new Error("Failed to sent email");
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      res.status(400).json({ message: error.message });
    else
      res.status(500).json({ message: "An Unknown Error Occurred" });
  }
}