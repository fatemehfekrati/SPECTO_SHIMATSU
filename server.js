const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


// اینجا اطلاعات SMTP خودت رو بگذار (بعد از اینکه رمز رو عوض کردی!)
const transporter = nodemailer.createTransport({
  host: "mail.spectoshimatsu.com",
  port: 587,
  secure: false,
  auth: {
    user: "moro@spectoshimatsu.com",
    pass: "PASSWORD"
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.post("/send", async (req, res) => {
  const { name, email } = req.body;

  try {
    await transporter.sendMail({
      from: `"فرم سایت" <moro@spectoshimatsu.com>`,
      to: "fatemefekrati@gmail.com",  // ایمیل کارفرما
      subject: "اطلاعات جدید فرم",
      html: `
        <p><b>نام:</b> ${name}</p>
        <p><b>ایمیل:</b> ${email}</p>
      `
    });

    res.send("ارسال شد، برو حالشو ببر.");
  } catch (err) {
    console.error(err);
    res.status(500).send("خراب شد، ولی دنیا که تموم نشد.");
  }
});
app.use(express.static("public"));
app.listen(3000, () => console.log("Server running on port 3000"));
