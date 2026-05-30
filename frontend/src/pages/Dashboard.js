import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useUser } from "../context/UserContext";
import RecipeCard from "../components/RecipeCard";

export default function Dashboard() {
  const { user } = useUser();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api.get("/recipes/mine").then((res) => setRecipes(res.data));
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this recipe?")) return;
    await api.delete(`/recipes/${id}`);
    setRecipes(recipes.filter((r) => r.id !== id));
  }

  return (
    <div style={styles.page}>
      <h1>👨‍🍳 My Recipes</h1>
      <p>Welcome, {user?.username}! Manage your recipes below.</p>
      <Link to="/create" style={styles.createBtn}>+ New Recipe</Link>
      {recipes.length === 0 && <p style={{ marginTop: "20px" }}>You haven't posted any recipes yet.</p>}
      <div style={styles.grid}>
        {recipes.map((r) => (
          <div key={r.id} style={styles.cardWrapper}>
            <RecipeCard recipe={r} />
            <div style={styles.actions}>
              <Link to={`/recipes/${r.id}/edit`} style={styles.editBtn}>Edit</Link>
              <button onClick={() => handleDelete(r.id)} style={styles.deleteBtn}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "24px" },
  grid: { display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" },
  cardWrapper: { display: "flex", flexDirection: "column", gap: "8px" },
  actions: { display: "flex", gap: "8px" },
  createBtn: { display: "inline-block", padding: "8px 16px", background: "#ff6b35", color: "white", borderRadius: "4px", textDecoration: "none" },
  editBtn: { padding: "6px 12px", background: "#4a90e2", color: "white", borderRadius: "4px", textDecoration: "none", fontSize: "0.85rem" },
  deleteBtn: { padding: "6px 12px", background: "#e74c3c", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" },
};
