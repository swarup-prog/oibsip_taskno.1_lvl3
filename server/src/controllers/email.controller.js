const nodemailer = require("nodemailer");

const sendEmail = (req, res) => {
  const { email, OTP } = req.body;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // user: process.env.MY_EMAIL,
      // pass: process.env.MY_PASSWORD,
      user: "lswarup.prog@gmail.com",
      pass: "dzku zfot nglj atln",
    },
  });

  const mail_configs = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "PIZZERIA PASSWORD RECOVERY",
    html: `<!DOCTYPE html>
    <html lang="en" >
    <head>
      <meta charset="UTF-8">
      <title>CodePen - OTP Email Template</title>
      
    
    </head>
    <body>
    <!-- partial:index.partial.html -->
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #ef4343;text-decoration:none;font-weight:600">PIZZERIA</a>
        </div>
        <p style="font-size:1.1em">Dear customer,</p>
        <p>Use the following OTP to complete your Password Recovery Procedure for your Pizzeria account. OTP is valid for 5 minutes</p>
        <h2 style="background: #ef4343;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
        <p style="font-size:0.9em;">Regards,<br />Pizzeria</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Pizzeria Ltd.</p>
          <p>Durbarmarg, Kathmandu</p>
          <p>Nepal</p>
        </div>
      </div>
    </div>
    <!-- partial -->
      
    </body>
    </html>`,
  };

  transporter.sendMail(mail_configs, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error." });
    }
    return res.send({ message: "Email sent successfully" });
  });
};

module.exports = sendEmail;
