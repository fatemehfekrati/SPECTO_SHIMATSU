const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); 
app.get("/contact-us_d2", (req, res) => {
  res.sendFile(__dirname + "/public/contact-us_d2.html");
});
app.get("/Quanta_Libs", (req, res) => {
  res.sendFile(__dirname + "/public/Quanta_Libs.html");
});

const transporter = nodemailer.createTransport({
  host: "server146c.irwebspace.com",  
  secure: false,
  auth: {
    user: "moro@spectoshimatsu.com",   
    pass: "z9pKifTW725SI0ov"               
  },
  tls: {
    rejectUnauthorized: false         
  }
});


app.post("/send", async (req, res) => {
  const { name, email, phone ,industry ,message } = req.body;

  try {
    console.log("sending to", "moro@spectoshimatsu.com");
    await transporter.sendMail({
      from: `"فرم سایت" <moro@spectoshimatsu.com>`,
      to: "moro@spectoshimatsu.com",        
      subject: "اطلاعات جدید فرم",
      html: `
        <p><b>name:</b> ${name}</p>
        <p><b>email:</b> ${email}</p>
        <p><b>phone:</b> ${phone}</p>
       <p><b>industry:</b> ${industry}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    res.send("✔️ ");
  } catch (err) {
    console.error("SMTP ERROR:", err);
    res.status(500).send("❌");
  }
});

// ============= اجرای سرور ===============
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

