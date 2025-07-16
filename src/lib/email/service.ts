import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface NewsletterData {
  email: string;
}

// Create a transporter using environment variables
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Send a generic email
export const sendEmail = async ({ to, subject, text, html }: EmailOptions): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'info@aliiliau.com',
      to,
      subject,
      text,
      html,
    });
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Send a contact form submission notification
export const sendContactFormNotification = async (data: ContactFormData): Promise<boolean> => {
  const { name, email, phone, message } = data;
  
  // Email to admin
  const adminEmailOptions: EmailOptions = {
    to: process.env.EMAIL_FROM || 'info@aliiliau.com',
    subject: 'New Contact Form Submission',
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };
  
  // Confirmation email to user
  const userEmailOptions: EmailOptions = {
    to: email,
    subject: 'Thank you for contacting AliʻiLuau',
    html: `
      <h2>Aloha ${name},</h2>
      <p>Thank you for contacting AliʻiLuau. We have received your message and will get back to you as soon as possible.</p>
      <p>Here's a copy of your message:</p>
      <p>${message}</p>
      <p>Mahalo,</p>
      <p>The AliʻiLuau Team</p>
    `,
  };
  
  try {
    // Send both emails
    const adminEmailSent = await sendEmail(adminEmailOptions);
    const userEmailSent = await sendEmail(userEmailOptions);
    
    return adminEmailSent && userEmailSent;
  } catch (error) {
    console.error('Error sending contact form notification:', error);
    return false;
  }
};

// Send a newsletter subscription confirmation
export const sendNewsletterConfirmation = async (data: NewsletterData): Promise<boolean> => {
  const { email } = data;
  
  // Email to admin
  const adminEmailOptions: EmailOptions = {
    to: process.env.EMAIL_FROM || 'info@aliiliau.com',
    subject: 'New Newsletter Subscription',
    html: `
      <h2>New Newsletter Subscription</h2>
      <p><strong>Email:</strong> ${email}</p>
    `,
  };
  
  // Confirmation email to user
  const userEmailOptions: EmailOptions = {
    to: email,
    subject: 'Welcome to the AliʻiLuau Newsletter',
    html: `
      <h2>Aloha!</h2>
      <p>Thank you for subscribing to the AliʻiLuau newsletter. You'll now receive updates about our upcoming events, special offers, and Hawaiian cultural insights.</p>
      <p>If you didn't subscribe to our newsletter, please ignore this email or contact us to remove your email from our list.</p>
      <p>Mahalo,</p>
      <p>The AliʻiLuau Team</p>
    `,
  };
  
  try {
    // Send both emails
    const adminEmailSent = await sendEmail(adminEmailOptions);
    const userEmailSent = await sendEmail(userEmailOptions);
    
    return adminEmailSent && userEmailSent;
  } catch (error) {
    console.error('Error sending newsletter confirmation:', error);
    return false;
  }
};

export default {
  sendEmail,
  sendContactFormNotification,
  sendNewsletterConfirmation,
};
