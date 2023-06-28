import React, { useState } from "react";
import "../styles/Contact.css";
import { motion } from "framer-motion";
import NavLinks from "./navbar/NavLinks";
import axios from "axios";

const Contact = ({ handleNav }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const fade = {
    opacity: 1,
    transition: {
      duration: 1.5,
    },
  };

  const verticalLeft = {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
    },
  };

  const submitComment = async (commentData) => {
    try {
      await axios.post('/api/submitComment', commentData);
      // Handle success, show a success message, etc.
    } catch (error) {
      console.error('Error submitting comment:', error);
      // Handle error, show an error message, etc.
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
      await submitComment(commentData);

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
