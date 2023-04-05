import { useState } from "react";
import "./index.scss";

export default function Contact() {
  const [inputs, setInputs] = useState({ name: "", message: "" });
  const [status, setStatus] = useState("Send");

  const handleChange = (e) => {
    setInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // @todo: setup Mail Receiver
    setTimeout(() => {
      setStatus("Sent Successfully");
      setInputs({ name: "", message: "" });
    }, 500);
    setStatus("Submitting..");
  };

  return (
    <div className="contact-Page">
      <div className="container">
        <header>
          <h2>Contact Notes.</h2>
          <p>Contact &amp; Tell us What's on Your Mind.</p>
        </header>
        <div className="row">
          <div className="contact-Bg">
            <img src="./SVGs/contact.svg" alt="Contact" />
          </div>
          <div className="contact-Form">
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={inputs.name}
                required
                onChange={handleChange}
              />
              <textarea
                name="message"
                rows="10"
                cols="50"
                placeholder="Your Message"
                value={inputs.message}
                required
                onChange={handleChange}
              />
              <button type="submit">{status}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
