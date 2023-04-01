const nodemailer = require("nodemailer")

let mailer = (req, res, next) => {
  const { doctorId, ownerName, ownerEmail, ownerPhone, petCategory, petIssue, appointmentDate } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'thepetvet.india@gmail.com',
      pass: 'wibmoqfinpkiyxja'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  transporter.sendMail({
    to: `${ownerEmail}`,
    subject: "Appointment Mail",
    html: `<div style="max-width: 90%; margin: 0 auto; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
    <p style="margin-bottom: 20px;">Dear <strong>${ownerName}</strong>,</p>
    <p style="margin-bottom: 20px;">Thank you for scheduling an appointment at The PetVet. We have received your request and will be happy to assist you with your pet's needs.</p>
    <p style="margin-bottom: 20px;">Here are the details of your appointment:</p>
    <ul style="list-style-type: none; margin: 0; padding: 0;">
        <li style="margin-bottom: 10px;"><strong>Name:</strong> ${ownerName}</li>
        <li style="margin-bottom: 10px;"><strong>Email:</strong> ${ownerEmail}</li>
        <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${ownerPhone}</li>
        <li style="margin-bottom: 10px;"><strong>Pet Category:</strong> ${petCategory}</li>
        <li style="margin-bottom: 10px;"><strong>Pet Issue:</strong> ${petIssue}</li>
        <li style="margin-bottom: 10px;"><strong>Appointment Date:</strong> ${appointmentDate}</li>
        <li style="margin-bottom: 10px;"><strong>Appointment Status:</strong> Pending</li>
    </ul>
    <p style="margin-top: 20px; margin-bottom: 20px;">If any of the information above is incorrect or if you need to reschedule your appointment, please let us know as soon as possible.</p>
    <p style="margin-bottom: 20px;">We look forward to seeing you and your pet soon!</p>
    <p style="margin-bottom: 0;">Sincerely,</p>
    <p style="margin-top: 0; margin-bottom: 20px;">The PetVet Team</p>
</div>`
  }).then(() => {
    console.log("mail sent successfully on "+ ownerEmail);
    next()
  }).catch((err) => {
    console.log(err);
    console.log("err in sending mail");
    res.json({ "Error": err });
  })
}

module.exports = {
  mailer
}