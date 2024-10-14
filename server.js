const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 80;

app.use(express.static('public'));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { title: 'Rose and Co. Beauty Salon Marketing' });
});

app.post('/submit-form', (req, res) => {
    const { firstName, lastName, email, phone, companyName, position } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'customermail532@gmail.com',
            pass: 'epzg xifa nwqs opuu'
        }
    });

    const mailOptions = {
        from: email,
        to: 'roseycomanagement@roseyco.co.uk',
        subject: `New Contact Form Submission from ${firstName} ${lastName}`,
        text: `Email: ${email}\nPhone: ${phone}\nCompany: ${companyName}\nPosition: ${position}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Failed to send email.' });
        }
        res.json({ success: true, message: 'Email sent successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
