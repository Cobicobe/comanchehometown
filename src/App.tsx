import React, { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

export default function App() {
  const [orderDetails, setOrderDetails] = useState<string>("");
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!orderDetails || !paymentAmount) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await emailjs.send(
        "service_fo0rd1d",
        "template_sx60l1b",
        {
          order_details: orderDetails,
          payment_amount: paymentAmount,
        },
        "MmGmvB-l5rMfTCJzo"
      );

      setSubmitted(true);
    } catch (error) {
      console.error("Failed to send order:", error);
      alert("Failed to send order. Try again.");
    }
  };

  if (submitted) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Thank you for your order!</h2>
        <p>Please click the button below to pay the total amount including $5 delivery fee.</p>
        <a
          href="YOUR_STRIPE_PAYMENT_LINK_HERE"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "10px 20px",
            background: "#6772e5",
            color: "white",
            borderRadius: "4px",
            textDecoration: "none",
            display: "inline-block",
            marginTop: "10px",
          }}
        >
          Pay Now
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Place Your Order</h2>
      <p>Please include $5 delivery fee in the total payment amount.</p>

      <label style={{ display: "block", marginBottom: "10px" }}>
        Order Details:
        <textarea
          value={orderDetails}
          onChange={(e) => setOrderDetails(e.target.value)}
          rows={5}
          style={{ width: "100%" }}
          required
        />
      </label>

      <label style={{ display: "block", marginBottom: "10px" }}>
        Total Payment Amount (including $5 delivery fee):
        <input
          type="number"
          min={6}
          step="0.01"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          required
          style={{ width: "100%" }}
        />
      </label>

      <button type="submit" style={{ padding: "10px 15px" }}>
        Submit Order
      </button>
    </form>
  );
}


