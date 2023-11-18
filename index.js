const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

app.post('/send-otp', async (req, res) => {
    const { email, otp } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-password'
        }
    });

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'OTP for Discord Bot',
        text: `Your OTP is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error while sending email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully!');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
