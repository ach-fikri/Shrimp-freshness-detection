const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({path: '.env'});

const transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL
    },
    pool: true, // Mengaktifkan pooling
    maxConnections: 5, // Batas jumlah koneksi
    maxMessages: 10, // Batas jumlah pesan per koneksi
});

const sendEmail = async (email, subject, message) => {
    try {
        // console.log(`User email: ${process.env.USER_EMAIL}, Password: ${process.env.PASSWORD_EMAIL}`)
        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: email,
            subject: subject,
            html: message
        });
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = {sendEmail};