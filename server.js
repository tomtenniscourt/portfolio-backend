// server.js
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const PORT = process.env.PORT || 3333;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Contact form route
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "tomcourt.softwareengineer@gmail.com",
      pass: "K983mwhatsername!",
    },
  });

  // Configure the email message
  const mailOptions = {
    from: email,
    to: "tomcourt.softwareengineer@gmail.com",
    subject: "Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to send the email" });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ message: "Email sent successfully" });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
