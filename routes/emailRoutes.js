// emailRoutes.js

const express = require('express');
const router = express.Router();
const Brevo = require('@getbrevo/brevo');

router.post('/sendMultipleEmails', async (req, res) => {
  try {
    // Initialize Brevo API client and set API key
    const defaultClient = Brevo.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = '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';

    // Create an instance of the TransactionalEmailsApi
    const apiInstance = new Brevo.TransactionalEmailsApi();

    // Extract recipients from the request body
    const recipients = req.body.recipients || [];

    // Check if there are recipients
    if (recipients.length === 0) {
      return res.status(400).json({ success: false, message: 'No recipients provided' });
    }

    // Construct the SendSmtpEmail object for multiple emails
    const sendSmtpEmail = new Brevo.SendSmtpEmail({
      sender: { email: 'orders@knitsilk.com', name: 'Knitsilk' },
      subject: 'This is my default subject line',
      htmlContent: '<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>',
      params: { greeting: 'This is the default greeting', headline: 'This is the default headline' },
      to: recipients.map((recipient) => ({
        email: recipient.email,
        name: recipient.name,
      })),
    });

    // Send the transactional email
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('API called successfully. Returned data:', data);

    res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
