import nodemailer from "nodemailer";
import emailQueue from "../queue/emailQueue.js";


emailQueue.process(async (job) => {

  const { emails, subject, html, gmailEmail, gmailAppPassword } = job.data;
console.log(job.data);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailEmail, pass: gmailAppPassword },
  });

  for (const email of emails) {
    try {
      await transporter.sendMail({
        from: gmailEmail,
        to: email,
        subject,
        html,
      });
      console.log(`✅ Sent to ${email}`);
    } catch (err) {
      console.error(`❌ Failed to send to ${email}:`, err.message);
    }
  }

  console.log(`Job completed for ${emails.length} emails`);
});
