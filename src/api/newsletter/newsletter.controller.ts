import { Request, RequestHandler, Response } from "express";
import { sendEmail } from "../../utils/sendEmail";
import { handleError } from "../../utils/handleError";

export const sendingMail: RequestHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ success: false, message: "Email is required." });
    return;
  }
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
    if (emailSent) {
      res.status(200).json("Email sent successfully");
      return;
    }
    else
      throw new Error("Failed to sent email");
  } catch (error) {
    handleError(res, error, 400);
  }
}