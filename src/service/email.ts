import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.NEXT_PUBLIC_NODEMAILER_USER,
    pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS,
  },
});



export async function sendOrderConfirmationMail(recipient:string){  
    
    const from = process.env.NEXT_PUBLIC_NODEMAILER_USER 
    const to = recipient
    const subject = "Order Confirmation"
    const text = "We have received your order and will process it soon. Thank you for shopping with us."
    const html = "<b>We have received your order and will process it soon. Thank you for shopping with us.</b>"
    // const attachments = []
    const mailOptions = {
        from,
        to,
        subject, 
        text,
        html,
        };
        
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
  } catch (error) {
         console.error('Error sending email:', error);
  }
    
}
export async function sendPaymentConfirmationMail(recipient:string){  
    
    const from = process.env.NEXT_PUBLIC_NODEMAILER_USER 
    const to = recipient
    const subject = "Order Confirmation"
    const text = "We have received your payment and will process your order soon. Thank you for shopping with us."
    const html = "<b>We have received your payment and will process your order soon. Thank you for shopping with us.</b>"
    // const attachments = []
    const mailOptions = {
        from,
        to,
        subject, 
        text,
        html,
        };
        
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
  } catch (error) {
         console.error('Error sending email:', error);
  }
    
}









