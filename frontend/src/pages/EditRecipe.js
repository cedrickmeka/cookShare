import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function EditRecipe() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", ingredients: "", instructions: "", image_url: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/recipes/${id}`).then((res) => {
      const { title, ingredients, instructions, image_url } = res.data;
      setForm({ title, ingredients, instructions, image_url });
    });
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await api.put(`/recipes/${id}`, form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update recipe");
    }
  }

  return (
    <div style={styles.page}>
      <h1>Edit Recipe</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} style={styles.input} required />

        <label>Ingredients</label>
        <textarea name="ingredients" value={form.ingredients} onChange={handleChange} style={styles.textarea} required />

        <label>Instructions</label>
        <textarea name="instructions" value={form.instructions} onChange={handleChange} style={styles.textarea} required />

        <label>Image URL (optional)</label>
        <input name="image_url" value={form.image_url} onChange={handleChange} style={styles.input} />

        <button type="submit" style={styles.btn}>Save Changes</button>
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
