import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

interface EmailData {
  to: string;
  subject: string;
  text?: string;
  html: string;
}

export const sendEmail = async (data: EmailData) => {
  try {
    const msg = {
      from: {
        email:"abhijeet541sharma@gmail.com",
        name: "Abhijeet"
      },
      ...data
    }

    await sgMail.send(msg);
    console.log("Email Sent Successfully");
    return true;
  } catch (error) {
    console.log("Error sending email: ", error);
    return false;
  }
}