

import { useState } from "react";

function Donate() {
  const [donationType, setDonationType] = useState("one-time");
  const [amount, setAmount] = useState(1000);
  const [program, setProgram] = useState("Where Most Needed");
  const [donor, setDonor] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const amounts = [500, 1000, 2500, 5000, 10000];

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      donationType,
      amount,
      program,
      donor,
    });

    alert("Donation details submitted successfully!");
  };

  return (
    <div className="donate-page">

      {/* HERO */}
      <section className="donate-hero">
        <div>
          <span>MAKE AN IMPACT</span>

          <h1>
            Your Support Can
            <br />
            <strong>Change a Life.</strong>
          </h1>

          <p>
            Every contribution helps us provide education, healthcare,
            livelihood opportunities and hope to communities in need.
          </p>
        </div>
      </section>

      {/* DONATION SECTION */}
      <section className="donation-section">

        <div className="donation-info">

          <span className="section-tag">SUPPORT OUR MISSION</span>

          <h2>
            Give Today.
            <br />
            <span>Create Tomorrow.</span>
          </h2>

          <p>
            Your donation directly supports our programs and helps us
            reach children, women and families who need support.
          </p>

          <div className="donation-impact">

            <div>
              <strong>₹500</strong>
              <p>Can support learning materials</p>
            </div>

            <div>
              <strong>₹1,000</strong>
              <p>Can support educational activities</p>
            </div>

            <div>
              <strong>₹2,500</strong>
              <p>Can support community programs</p>
            </div>

          </div>

        </div>

        {/* DONATION FORM */}
        <div className="donation-card">

          <h2>Make a Donation</h2>

          {/* Donation Type */}
          <div className="donation-type">

            <button
              type="button"
              className={
                donationType === "one-time" ? "active" : ""
              }
              onClick={() => setDonationType("one-time")}
            >
              One-Time
            </button>

            <button
              type="button"
              className={
                donationType === "monthly" ? "active" : ""
              }
              onClick={() => setDonationType("monthly")}
            >
              Monthly
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            {/* Amount */}
            <label>Choose Amount</label>

            <div className="amount-options">

              {amounts.map((value) => (
                <button
                  type="button"
                  key={value}
                  className={amount === value ? "selected" : ""}
                  onClick={() => setAmount(value)}
                >
                  ₹{value.toLocaleString("en-IN")}
                </button>
              ))}

            </div>

            <label>Custom Amount</label>

            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
              required
            />

            {/* Program */}
            <label>Support a Program</label>

            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            >
              <option>Where Most Needed</option>
              <option>Education Programs</option>
              <option>Healthcare Initiatives</option>
              <option>Livelihood Programs</option>
              <option>Women Empowerment</option>
            </select>

            {/* Donor Details */}
            <label>Your Name</label>

            <input
              type="text"
              value={donor.name}
              onChange={(e) =>
                setDonor({
                  ...donor,
                  name: e.target.value,
                })
              }
              placeholder="Full Name"
              required
            />

            <label>Email Address</label>

            <input
              type="email"
              value={donor.email}
              onChange={(e) =>
                setDonor({
                  ...donor,
                  email: e.target.value,
                })
              }
              placeholder="Email Address"
              required
            />

            <label>Phone Number</label>

            <input
              type="tel"
              value={donor.phone}
              onChange={(e) =>
                setDonor({
                  ...donor,
                  phone: e.target.value,
                })
              }
              placeholder="Phone Number"
              required
            />

            <button
              type="submit"
              className="donate-submit"
            >
              Donate ₹{amount.toLocaleString("en-IN")} →
            </button>

          </form>

          <p className="secure-payment">
            🔒 Secure payment processing
          </p>

        </div>

      </section>

      {/* PAYMENT GATEWAYS */}
      <section className="payment-section">

        <span className="section-tag">SECURE PAYMENTS</span>

        <h2>Multiple Ways to Give</h2>

        <p>
          We plan to support trusted payment gateways so donors can
          contribute securely and conveniently.
        </p>

        <div className="payment-options">

          <div>
            <strong>Razorpay</strong>
            <span>UPI • Cards • Net Banking</span>
          </div>

          <div>
            <strong>Stripe</strong>
            <span>Cards • International Payments</span>
          </div>

          <div>
            <strong>PayPal</strong>
            <span>International Donations</span>
          </div>

        </div>

      </section>

      {/* THANK YOU CTA */}
      <section className="donate-cta">

        <h2>
          Every contribution
          <br />
          <strong>creates an impact.</strong>
        </h2>

        <p>
          Thank you for standing with the communities we serve.
        </p>

      </section>

    </div>
  );
}

export default Donate;
