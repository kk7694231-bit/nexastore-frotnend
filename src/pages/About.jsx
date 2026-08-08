import React from "react";

function About() {
  return (
    <div className="info-page">

      <div className="info-page-container">

        <span className="info-page-tag">
          ABOUT NEXASTORE
        </span>

        <h1>
          Your Trusted Online
          <span> Shopping Destination</span>
        </h1>

        <p className="info-page-intro">
          NexaStore is an online shopping platform
          created to provide quality products at
          affordable prices with a simple and
          convenient shopping experience.
        </p>

        <div className="info-cards">

          <div className="info-card">
            <div>🛍️</div>
            <h2>Wide Product Selection</h2>
            <p>
              Explore mobiles, electronics, fashion,
              gaming products and accessories.
            </p>
          </div>

          <div className="info-card">
            <div>💰</div>
            <h2>Best Prices</h2>
            <p>
              Find quality products at competitive
              prices.
            </p>
          </div>

          <div className="info-card">
            <div>🚚</div>
            <h2>Fast Delivery</h2>
            <p>
              We focus on providing a smooth and
              reliable shopping experience.
            </p>
          </div>

          <div className="info-card">
            <div>🔒</div>
            <h2>Secure Shopping</h2>
            <p>
              Your shopping experience is designed
              with security and convenience in mind.
            </p>
          </div>

        </div>

        <div className="about-story">

          <h2>Why Choose NexaStore?</h2>

          <p>
            At NexaStore, our goal is to make online
            shopping simple, convenient and enjoyable.
            From discovering products to placing an
            order, we aim to provide a smooth experience
            for every customer.
          </p>

        </div>

      </div>

    </div>
  );
}

export default About;