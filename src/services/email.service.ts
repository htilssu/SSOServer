import {createTransport} from "nodemailer";

const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendOtp(email: string, otp: string) {
    return await transporter.sendMail({
        from: {
            name: "SSO Service",
            address: process.env.EMAIL_USER!,
        },
        to: email,
        subject: "MÃ XÁC NHẬN",
        html: `<h3>Mã xác nhận của bạn là: <strong>${otp}</strong></h3>`,
    });

}

export default transporter;