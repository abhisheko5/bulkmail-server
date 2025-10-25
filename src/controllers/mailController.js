import XLSX from "xlsx";
import emailQueue from "../queue/emailQueue.js";

export const sendBulkEmail = async (req, res) => {
  try {
    const { subject, html, gmailEmail, gmailAppPassword } = req.body;
    const file = req.file;
    console.log(req.body);
    console.log(req.file);

    if (!file) return res.status(400).json({ message: "Excel file is required" });

    // Parse Excel file
    const workbook = XLSX.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const emails = data.map(row => row.email).filter(Boolean);

    if (emails.length === 0)
      return res.status(400).json({ message: "No valid emails found in Excel" });
    console.log(emails.length);
    // Add job to queue
    await emailQueue.add(
      { emails, subject, html, gmailEmail, gmailAppPassword },
      { attempts: 3, backoff: 10000 } // retry 3 times, 10s delay between
    );

    res.status(200).json({
      message: `Email job queued successfully for ${emails.length} recipients.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding job", error: error.message });
  }
};
