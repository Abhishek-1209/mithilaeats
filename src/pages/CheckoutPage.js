import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext) || { cart: [] }; // Ensures cart is always an array
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    pincode: "",
    mobile: "",
  });
  const navigate = useNavigate();

  const totalAmount = cart.length > 0 
    ? cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
    : 0;

  // Handle input changes
  const handleChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    const { name, address, pincode, mobile } = customerDetails;

    // Validate form inputs
    if (!name || !address || !pincode || !mobile) {
      alert("Please fill all details before placing an order.");
      return;
    }

    alert(`Order placed successfully!\nPayment Method: ${paymentMethod}\nDelivery Details:\n${name}, ${address}, ${pincode}, ${mobile}`);
    
    clearCart();
    navigate("/#");
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. <a href="/products">Continue Shopping</a></p>
      ) : (
        <>
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cart.map((item) => (
              <p key={item.id}>
                {item.name} x {item.quantity || 1} - ₹{item.price * (item.quantity || 1)}
              </p>
            ))}
            <h3>Total: ₹{totalAmount}</h3>
          </div>

          {/* Customer Details Form */}
          <div className="customer-details">
            <h3>Delivery Details</h3>
            <label>Name:</label>
            <input type="text" name="name" value={customerDetails.name} onChange={handleChange} placeholder="Enter full name" required />

            <label>Address:</label>
            <input type="text" name="address" value={customerDetails.address} onChange={handleChange} placeholder="Enter delivery address" required />

            <label>Pincode:</label>
            <input type="number" name="pincode" value={customerDetails.pincode} onChange={handleChange} placeholder="Enter pincode" required />

            <label>Mobile Number:</label>
            <input type="tel" name="mobile" value={customerDetails.mobile} onChange={handleChange} placeholder="Enter mobile number" required />
          </div>

          {/* Payment Method Selection */}
          <div className="payment-method">
            <h3>Select Payment Method</h3>
            <label>
              <input type="radio" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
              Cash on Delivery
            </label>
            <label style={{ color: "grey", cursor: "not-allowed", opacity: 0.6 }}>
              <input type="radio" name="payment" value="online" disabled />
              Online Payment (Coming Soon)
            </label>
          </div>

          <button className="btn btn-success" onClick={handlePayment}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
