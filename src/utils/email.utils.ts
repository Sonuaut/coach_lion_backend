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


// Create beautiful OTP email template
export const createOTPEmailTemplate = (otp: string, userName: string): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: white;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 300;
            }
            .content {
                padding: 40px 30px;
                text-align: center;
            }
            .otp-box {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 10px;
                margin: 30px 0;
                display: inline-block;
                min-width: 200px;
            }
            .otp-code {
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 8px;
                margin: 10px 0;
            }
            .message {
                color: #666;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            .footer {
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
                color: #666;
                font-size: 14px;
            }
            .warning {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                color: #856404;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔐 Email Verification</h1>
            </div>
            <div class="content">
                <h2>Hello ${userName}!</h2>
                <p class="message">
                    Thank you for signing up! To complete your registration, please use the verification code below:
                </p>
                
                <div class="otp-box">
                    <div style="font-size: 14px; margin-bottom: 10px;">Your Verification Code</div>
                    <div class="otp-code">${otp}</div>
                    
                </div>
                
                <div class="warning">
                    <strong>⚠️ Security Notice:</strong><br>
                    • Never share this code with anyone<br>
                    • Our team will never ask for this code<br>
                </div>
                
                <p class="message">
                    If you didn't request this verification, please ignore this email.
                </p>
            </div>
            <div class="footer">
                <p>© 2024 Coach Lion. All rights reserved.</p>
                <p>This is an automated email, please do not reply.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

// Send an email
export const sendEmail = async (to: string, subject: string, text: string, html?: string): Promise<void> => {
    try {
        await transporter.sendMail({
            from: CommonVariables.SMTP_FROM,
            to,
            subject,
            text,
            html,
        });
        console.log('Email sent to', to);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

// Send OTP email
export const sendOTPEmail = async (to: string, otp: string, userName: string): Promise<void> => {
    const subject = "🔐 Your Email Verification Code - Coach Lion";
    const html = createOTPEmailTemplate(otp, userName);
    const text = `Your verification code is: ${otp}.`;
    
    await sendEmail(to, subject, text, html);
};
