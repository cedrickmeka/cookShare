import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useUser } from "../context/UserContext";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/register", form);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h2>Create Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} style={styles.input} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={styles.input} required />
          <button type="submit" style={styles.btn}>Register</button>
        </form>
        <p>Have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", justifyContent: "center", padding: "60px 24px" },
  box: { background: "white", padding: "32px", borderRadius: "8px", boxShadow: "0 2px 12px rgba(0,0,0,0.1)", width: "100%", maxWidth: "380px" },
  input: { display: "block", width: "100%", padding: "10px", marginBottom: "12px", border: "1px solid #ddd", borderRadius: "4px", boxSizing: "border-box" },
  btn: { width: "100%", padding: "10px", background: "#ff6b35", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "1rem" },
  error: { color: "red", marginBottom: "12px" },
};
