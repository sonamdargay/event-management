// PaymentPage.js
import React, { useState } from "react";
import { StripeAdapter } from "../components/StripeAdapter";
import { PaypalAdapter } from "../components/PaypalAdapter";
import { FundingProcessor } from "../components/FundingProcessor";

export default function PaymentPage() {
  const [method, setMethod] = useState("stripe");

  const handlePayment = () => {
    let adapter;
    if (method === "stripe") {
      adapter = new StripeAdapter();
    } else {
      adapter = new PaypalAdapter();
    }

    const processor = new FundingProcessor(adapter);
    processor.processFunding();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8f8f8",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "15px",
            fontWeight: "600",
          }}
        >
          Keep Our Server Alive.
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "#555",
            marginBottom: "30px",
            lineHeight: "1.6",
          }}
        >
          We promise to keep our event management portal{" "}
          <strong>free forever</strong>. However, to make sure that happens, we
          need you to donate and fund the server as much as possible if you can
          afford to do so. Thank you for your contribution in helping this stay
          a free tool forever.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <label
            style={{
              fontSize: "1rem",
              fontWeight: "500",
            }}
          >
            Select Payment Method:
          </label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
          </select>

          <button
            onClick={handlePayment}
            style={{
              padding: "12px 20px",
              fontSize: "1rem",
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          >
            Pay Now
          </button>
        </div>

        {method === "paypal" && (
          <div id="paypal-button-container" style={{ marginTop: "20px" }}></div>
        )}
      </div>
    </div>
  );
}
