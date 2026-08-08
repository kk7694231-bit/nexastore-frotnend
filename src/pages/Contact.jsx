import React from "react";

function Contact() {
  return (
    <div className="info-page">

      <div className="info-page-container">

        <span className="info-page-tag">
          CONTACT NEXASTORE
        </span>

        <h1>
          We're Here to
          <span> Help You</span>
        </h1>

        <p className="info-page-intro">
          Have a question about a product, order or
          anything else? Get in touch with us.
        </p>


        <div className="contact-grid">

          <div className="contact-card">

            <div className="contact-icon">
              📍
            </div>

            <h2>Visit Us</h2>

            <p>
              Coimbatore,
              <br />
              Tamil Nadu, India
            </p>

          </div>


          <div className="contact-card">

            <div className="contact-icon">
              📞
            </div>

            <h2>Call Us</h2>

            <p>
              +91 9876543210
            </p>

          </div>


          <div className="contact-card">

            <div className="contact-icon">
              ✉️
            </div>

            <h2>Email Us</h2>

            <p>
              support@nexastore.com
            </p>

          </div>


          <div className="contact-card">

            <div className="contact-icon">
              🕐
            </div>

            <h2>Working Hours</h2>

            <p>
              Monday - Saturday
              <br />
              9:00 AM - 6:00 PM
            </p>

          </div>

        </div>


        <div className="contact-help">

          <h2>Need Help With Your Order?</h2>

          <p>
            For order-related questions, please keep
            your order details ready when contacting
            our support team.
          </p>

          <a
            href="mailto:support@nexastore.com"
          >
            Email Support
          </a>

        </div>

      </div>

    </div>
  );
}

export default Contact;