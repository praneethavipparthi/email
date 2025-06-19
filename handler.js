
const nodemailer = require("nodemailer");

module.exports.sendEmail = async (event) => {
    try {
        const { receiver_email, subject, body_text } = JSON.parse(event.body);

        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        const info = await transporter.sendMail({
            from: '"Serverless App" <no-reply@example.com>',
            to: receiver_email,
            subject: subject,
            text: body_text,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Email sent successfully",
                previewUrl: nodemailer.getTestMessageUrl(info),
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
