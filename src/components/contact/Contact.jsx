import "./Contact.css";
import React from "react";

export default function Contact() {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>
        If you have any questions or feedback, feel free to contact us using the
        form below.
      </p>
      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="5" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
