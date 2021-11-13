import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <>
      <div class="Main-block">
        <div class="left-part">
          <i class="fas fa-envelope"></i>
          <i class="fas fa-at"></i>
          <i class="fas fa-mail-bulk"></i>
        </div>
        <form class="form" action="/">
          <h1>Contact Us</h1>
          <div class="info">
            <input
              class="fname"
              type="text"
              name="name"
              placeholder="Full name"
            />
            <input type="text" name="name" placeholder="Email" />
            <input type="text" name="name" placeholder="Phone number" />
          </div>
          <p>Message</p>
          <div>
            <textarea rows="4"></textarea>
          </div>
          <button type="submit" href="/">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Contact;
