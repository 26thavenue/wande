const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

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



async function sendOrderConfirmationMail(recipient){  
    
    const from = {
        name: 'Wande Store',
        address: process.env.NEXT_PUBLIC_NODEMAILER_USER
    }
    const to = recipient
    const subject = "Order Confirmation"
    const text = "We have received your order and will process it soon. Thank you for shopping with us."
    const html = "<b>We have received your order and will process it soon. Thank you for shopping with us.</b>"
    const attachments = []
    const mailOptions = {
        from,
        to,
        subject,
        text,
        html,
        attachments
    }

    const mail = await transporter.sendMail(mailOptions)
}

async function sendPaymentConfirmationMail(recipient){  
    
    const from = {
        name: 'Wande Store',
        address: process.env.NEXT_PUBLIC_NODEMAILER_USER
    }
    const to = recipient
    const subject = "Payment Confirmation"
    const text = "We have received your payment, do not the delivery fees is not part of the amount sent and you will be subchraged on delivery. Be expecting your deliivery in 3-5 days and if there is a need to change the delivery address, please contact us as soon as possible."
    const html = "<b>We have received your payment, do not the delivery fees is not part of the amount sent and you will be subchraged on delivery. Be expecting your deliivery in 3-5 days and if there is a need to change the delivery address, please contact us as soon as possible</b>"
    const attachments = []
    const mailOptions = {
        from,
        to,
        subject,
        text,
        html,
        attachments
    }

    const mail = await transporter.sendMail(mailOptions)
}




sendOrderConfirmationMail('temitopeoni001@gmail.com')


module.exports = {sendOrderConfirmationMail, sendPaymentConfirmationMail}