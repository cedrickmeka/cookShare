import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <div style={styles.card}>
      {recipe.image_url && (
        <img src={recipe.image_url} alt={recipe.title} style={styles.img} />
      )}
      <div style={styles.body}>
        <h3 style={{ margin: "0 0 4px" }}>{recipe.title}</h3>
        <p style={{ margin: 0, color: "#666", fontSize: "0.85rem" }}>by {recipe.author}</p>
        <Link to={`/recipes/${recipe.id}`} style={styles.link}>View Recipe →</Link>
      </div>
    </div>
  );
}

const styles = {
  card: { border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", width: "280px", boxShadow: "0 2px 6px rgba(0,0,0,0.08)" },
  img: { width: "100%", height: "160px", objectFit: "cover" },
  body: { padding: "12px" },
  link: { display: "inline-block", marginTop: "8px", color: "#ff6b35", textDecoration: "none", fontWeight: "bold" },
};
