import React, { useState } from 'react'
import emailjs from 'emailjs-com'

const stores = [
  'Delbert’s Grocery',
  'Dollar General',
  'Family Dollar',
  'Thompson’s Pharmacy',
  'Loves Convenience Store',
  'Naks Convenience Store',
  'Thirsty’s Cold Pop Shop',
  'Comanche Feed and Grain',
]

function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    store: stores[0],
    order: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    emailjs
      .send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_PUBLIC_KEY')
      .then(() => {
        alert('Order sent!')
        setFormData({ name: '', email: '', store: stores[0], order: '' })
      })
      .catch((err) => {
        console.error('FAILED...', err)
        alert('Failed to send')
      })
  }

  return (
    <form onSubmit={sendEmail}>
      <label>Name:</label>
      <input name="name" value={formData.name} onChange={handleChange} required />

      <label>Email:</label>
      <input name="email" type="email" value={formData.email} onChange={handleChange} required />

      <label>Select Store:</label>
      <select name="store" value={formData.store} onChange={handleChange}>
        {stores.map((store) => (
          <option key={store} value={store}>{store}</option>
        ))}
      </select>

      <label>What do you need?</label>
      <textarea name="order" value={formData.order} onChange={handleChange} required />

      <button type="submit">Send Order</button>
    </form>
  )
}

export default OrderForm
