import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    } else if (form.username.trim().length < 4) {
      newErrors.username = "At least 4 characters";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.match(emailPattern)) {
      newErrors.email = "Invalid email format";
    }

    if (form.password.length < 6) {
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
        const res = await axios.post("http://localhost:3000/api/auth/signup", form);
        alert("Signup successful!");
        console.log(res.data);
        setServerMessage("Signup success. You can now login.");
       
      } catch (err) {
        console.error(err.response?.data || err.message);
        setServerMessage(err.response?.data?.msg || "Signup failed");
      }
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Create Account</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className={errors.username ? "error-input" : ""}
      />
      {errors.username && <p className="error-text">{errors.username}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className={errors.email ? "error-input" : ""}
      />
      {errors.email && <p className="error-text">{errors.email}</p>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className={errors.password ? "error-input" : ""}
      />
      {errors.password && <p className="error-text">{errors.password}</p>}

      <button type="submit">Signup</button>

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
  );
}

export default Signup;
