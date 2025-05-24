import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const validate = () => {
  const newErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!emailPattern.test(form.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!form.password.trim()) {
    newErrors.password = "Password is required";
  } else if (form.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  return newErrors;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:3000/api/auth/login", form);
        console.log("Login Success:", res.data);
        setServerMessage("Login successful!");
        alert(`Welcome, ${res.data.user.username}`);
        // You can redirect or store token here if needed
      } catch (err) {
        console.error(err.response?.data || err.message);
        setServerMessage(err.response?.data?.msg || "Login failed");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={errors.email ? "error-input" : ""}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className={errors.password ? "error-input" : ""}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button type="submit">Login</button>

        {serverMessage && (
          <p
            className={`server-message ${
              serverMessage.toLowerCase().includes("success") ? "success" : "error"
            }`}
          >
            {serverMessage}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
