const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            },  
        });

        const emailOption = {
            from: 'FindYourPet',
            to: option.email,
            subject: option.subject,
            text: option.message,
        };

        // Send the email
        await transporter.sendMail(emailOption);

        console.log("El Email se ha enviado correctamente");
    } catch (error) {
        console.error("Error al enviar el Email:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
};

module.exports = sendEmail;
