import nodemailer from "nodemailer"
export const sendEmail = async({to,subject , html} = {}) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "osamamn897@gmail.com",
        pass: "grng uqac rwlh gznc",
      },
    });
    await transporter.sendMail({
        from: '<osamamn897@gmail.com>',
        to,
        subject,
        html
    })
}