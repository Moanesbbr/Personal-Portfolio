import React, { useState } from "react";
import "../styles/Contact.css";
import { motion } from "framer-motion";
import NavLinks from "./navbar/NavLinks";
import axios from "axios";
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const Contact = ({ handleNav }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false); // Track success state
  const [error, setError] = useState(null);

  // OAuth2 credentials
  const oauth2Credentials = {
    web: {
      client_id: "325610695928-jfl4ncvd1s58boluaf61u4dkrca5nkvk.apps.googleusercontent.com",
      project_id: "dev-spirit-402913",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_secret: "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",
    },
  };

  // OAuth2 client
  const oAuth2Client = new google.auth.OAuth2({
    clientId: oauth2Credentials.web.client_id,
    clientSecret: oauth2Credentials.web.client_secret,
    redirectUri: 'YOUR_REDIRECT_URI', // Replace with your actual redirect URI
  });

  // Set up the Gmail API
  const gmail = google.gmail({
    version: 'v1',
    auth: oAuth2Client,
  });

  const sendEmail = async (to, subject, body) => {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'YOUR_EMAIL', // Replace with your Gmail email
          clientId: oauth2Credentials.web.client_id,
          clientSecret: oauth2Credentials.web.client_secret,
          refreshToken: 'YOUR_REFRESH_TOKEN', // Replace with your refresh token
          accessToken: accessToken,
        },
      });

      const mailOptions = {
        from: 'YOUR_EMAIL', // Replace with your Gmail email
        to: to,
        subject: subject,
        text: body,
      };

      // Send the email
      await transport.sendMail(mailOptions);

      // Set success state to true
      setSuccess(true);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set submitting state to true
    setSubmitting(true);

    // Create the comment data object
    const commentData = {
      name,
      email,
      message,
    };

    try {
      // Submit the comment
      await axios.post('/api/submitComment', commentData);

      // Send the email
      await sendEmail('moanesbbr@gmail.com', 'Contact Form Submission', `Name: ${name}\nEmail: ${email}\nMessage: ${message}`);

      // Reset form fields
      setName("");
      setEmail("");
      setMessage("");

      // Set success state to true
      setSuccess(true);
      setError(null);
    } catch (error) {
      console.error("Error submitting comment:", error);

      // Set error state
      setError("An error occurred while submitting the comment");
      setSuccess(false);
    }

    // Set submitting state to false
    setSubmitting(false);
  };

  return (
    <>
      <div className="contact" id="contact">
        <div className="container">
          <motion.div
            className="heading"
            initial={{ opacity: 0 }}
            whileInView={fade}
            viewport={{ once: true }}
          >
            <p className="heading-sub-text">Hire Me</p>
            <p className="heading-text">Get in Touch</p>
          </motion.div>
          <div className="contact-box">
            <motion.div
              className="left-box"
              initial={{ opacity: 0, y: "-50px" }}
              whileInView={verticalLeft}
            >
              <div className="contact-heading">
                <p>
                  I’m interested in freelance opportunities – especially
                  ambitious or large projects. However, if you have other
                  request or question, don’t hesitate to use the form
                </p>
              </div>
              <div className="contact-hello">
                <p>Say Hello</p>
                <NavLinks handleNav={handleNav} />
              </div>
            </motion.div>
            <motion.div
              className="right-box"
              initial={{ opacity: 0, y: "50px" }}
              whileInView={verticalLeft}
            >
              <form onSubmit={handleSubmit}>
                <div className="form-top">
                  <div className="name">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="email">
                    <label htmlFor="email">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-mid">
                  <div className="message">
                    <label htmlFor="message">Your message</label>
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Hi, I think I need you to work on this particular product. Reach out as soon as you can"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="form-btn">
                  <button
                    type="submit"
                    className="hero-contact"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Send Message"}
                  </button>
                </div>
                {success && (
                  <p className="success-message">
                    Message sent successfully!
                  </p>
                )}
                {error && <p className="error-message">{error}</p>}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
