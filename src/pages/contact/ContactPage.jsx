import Modal from "../../components/modal/Modal";
import "./ContactPage.css";
import { useState } from "react";

const ContactPage = () => {
  // TODO: integrate with backend API or email service

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    message: "",
  });

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSubmitModal(true);
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      {/* <Modal className={showSubmitModal ? "modal-visible" : "modal-hidden"}> */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        className={showSubmitModal ? "modal-visible" : "modal-hidden"}
      >
        <p>
          "Thank you! Your request has been submitted. We will contact you
          shortly."
        </p>
      </Modal>
      <h1>Contact Us</h1>
      <div className="contact-container">
        {/* Form Section */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Request a Free Estimate</h2>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Example@email.com"
          />

          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Phone Number"
          />

          <label>Preferred Date</label>
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
          />

          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Please describe the services you require or provide any relevant details."
          />

          <button type="submit">Submit</button>
        </form>

        {/* Contact Info */}
        <div className="contact-info">
          <h2>Our Contact Info</h2>
          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+14022181489">(402) 218-1489</a>
          </p>
          <p>
            <strong>Hours:</strong> Mon-Fri 8am - 6pm
          </p>
          <p>
            <strong>Address:</strong> 123 Main Street, Omaha, Ne, 68106
          </p>

          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              Facebook
            </a>
            <a href="#" aria-label="Instagram">
              Instagram
            </a>
            <a href="#" aria-label="Twitter">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
