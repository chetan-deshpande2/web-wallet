import mailgun from 'mailgun-js';
import 'dotenv/config';

const transactionSuccessMail = (email, tx) => {
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  });

  const sendFrom = 'noreply@demo.com';
  const userEmail = email;
  const details = tx;

  const htmlCode = `Transaction Successful ${details}`;

  const mailOptions = {
    from: sendFrom,
    to: userEmail,
    subject: 'Transaction Details',
    html: htmlCode
  };

  mg.messages().send(mailOptions, function (error, body) {
    if (error) {
      return;
    }

  });
};

export { transactionSuccessMail };
