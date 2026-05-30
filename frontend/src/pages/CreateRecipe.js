import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CreateRecipe() {
  const [form, setForm] = useState({ title: "", ingredients: "", instructions: "", image_url: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/recipes/", form);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create recipe");
    }
  }

  return (
    <div style={styles.page}>
      <h1>Create New Recipe</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} style={styles.input} required />

        <label>Ingredients</label>
        <textarea name="ingredients" value={form.ingredients} onChange={handleChange} style={styles.textarea} placeholder="List each ingredient..." required />

        <label>Instructions</label>
        <textarea name="instructions" value={form.instructions} onChange={handleChange} style={styles.textarea} placeholder="Step by step instructions..." required />

        <label>Image URL (optional)</label>
        <input name="image_url" value={form.image_url} onChange={handleChange} style={styles.input} />

        <button type="submit" style={styles.btn}>Post Recipe</button>
      </form>
    </div>
  );
}

const styles = {
  page: { padding: "24px", maxWidth: "600px", margin: "0 auto" },
  form: { display: "flex", flexDirection: "column", gap: "8px" },
  input: { padding: "10px", border: "1px solid #ddd", borderRadius: "4px" },
  textarea: { padding: "10px", border: "1px solid #ddd", borderRadius: "4px", minHeight: "100px", resize: "vertical" },
  btn: { padding: "10px", background: "#ff6b35", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "1rem" },
  error: { color: "red" },
};
