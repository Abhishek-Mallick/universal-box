import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'asha.grimes25@ethereal.email', // Ethereal email account
        pass: 'wYjr8uN6SJymmrkwKf'             // Ethereal email password
    }
});

const mailOptions = {
    from: 'youremail@gmail.com',             // This can be any email
    to: 'xyz@gmail.com',    // The recipient's email address
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

function sendForgotMail() {
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

sendForgotMail();
