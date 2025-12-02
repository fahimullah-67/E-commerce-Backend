import { Router } from 'express';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);
const router = Router();

router.post('/message', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "Please fill in all required fields." });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Your E-commerce App <onboarding@resend.dev>',
            to: ['fahimullah446@gmail.com'],
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h1>New Message from E-commerce Website</h1>
                <p><strong>Sender:</strong> ${name} (${email})</p>
                <hr>
                <h2>Message:</h2>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        });

        if (error) {
            return res.status(500).json({ message: "Email service failed to send the message." });
        }

        res.status(200).json({ message: "Message sent successfully!", resendId: data.id });

    } catch (err) {
        res.status(500).json({ message: "An unexpected server error occurred." });
    }
});

export default router;
