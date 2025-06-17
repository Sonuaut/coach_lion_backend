import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import CommonVariables from '../config/index';


const {
    SMTP_HOST,SMTP_PASSWORD,SMTP_PORT,SMTP_SECURE,SMTP_USER,SMTP_FROM
}=CommonVariables

console.log("varible before smtp :", SMTP_HOST,SMTP_PASSWORD,SMTP_PORT,SMTP_SECURE,SMTP_USER)
// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service:"gmail",
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT),
    secure: SMTP_SECURE === 'false',
    auth: {
        user:SMTP_FROM ,
        pass: SMTP_PASSWORD,
    },
} as SMTPTransport.Options);

// Optional: Verify the connection before sending
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP verification failed:', error);
    } else {
        console.log('SMTP server is ready to send emails');
    }
});

// Generate a 6-digit OTP
export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send an email
export const sendEmail = async (to: string, subject: string, text: string): Promise<void> => {
    try {
        await transporter.sendMail({
            from: CommonVariables.SMTP_FROM,
            to,
            subject,
            text,
        });
        console.log('Email sent to', to);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};
