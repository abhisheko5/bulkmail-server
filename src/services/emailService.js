import XLSX from "xlsx";
import nodemailer from "nodemailer";

export const sendBulkEmail = async (req, res) => {
  try {
    const { subject, html } = req.body;
    const file = req.file; // multer file upload

    if (!file) return res.status(400).json({ message: "Excel file is required" });

    // Parse Excel
    const workbook = XLSX.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const emails = data.map(row => row.email).filter(Boolean); // get only valid emails

    if (emails.length === 0) return res.status(400).json({ message: "No valid emails found in Excel" });

    // Setup Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: req.body.gmailEmail,
        pass: req.body.gmailAppPassword // App password recommended
      }
    });

    // Send emails one by one (for simplicity)
    const sendPromises = emails.map(email => {
      return transporter.sendMail({
        from: req.body.gmailEmail,
        to: email,
        subject,
        html
      });
    });

    await Promise.all(sendPromises);

    res.status(200).json({ message: `Emails sent to ${emails.length} recipients` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending emails", error: error.message });
  }
};
