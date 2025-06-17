import emailjs from '@emailjs/browser';
import { useState } from 'react';

function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    store: 'Comanche Feed & Grain',
    order: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        'service_fo0rd1d',
        'template_sx60l1b',
        formData,
        'MmGmvB-l5rMfTCJzo'
      )
      .then(() => {
        alert('Order sent successfully!');
        setFormData({
          name: '',
          email: '',
          store: 'Comanche Feed & Grain',
          order: ''
        });
      })
      .catch((error) => {
        console.error('Email send error:', error);
        alert('Failed to send order.');
      });
  };

  return (
    <form onSubmit={sendEmail}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <select
        name="store"
        value={formData.store}
        onChange={handleChange}
        required
      >
        <option>Comanche Feed & Grain</option>
        <option>Thompson's Pharmacy</option>
        <option>Delbert’s Grocery</option>
        <option>Family Dollar</option>
        <option>Dollar General</option>
        <option>Nak’s Convenience Store</option>
        <option>Thirsty's Cold Pop Shop</option>
        <option>Loves Convenience Store</option>
      </select>
      <textarea
        name="order"
        placeholder="What do you need?"
        value={formData.order}
        onChange={handleChange}
        required
      />
      <button type="submit">Send Order</button>
    </form>
  );
}

export default OrderForm;
