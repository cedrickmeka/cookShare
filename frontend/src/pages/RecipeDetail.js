import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useUser } from "../context/UserContext";

export default function RecipeDetail() {
  const { id } = useParams();
  const { user } = useUser();
  const [recipe, setRecipe] = useState(null);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    api.get(`/recipes/${id}`).then((res) => setRecipe(res.data));
    if (user) {
      api.get("/recipes/favorites").then((res) => {
        setFavorited(res.data.some((r) => r.id === parseInt(id)));
      });
    }
  }, [id, user]);

  async function toggleFavorite() {
    const res = await api.post(`/recipes/${id}/favorite`);
    setFavorited(res.data.favorited);
  }

  if (!recipe) return <p style={{ padding: "24px" }}>Loading...</p>;

  return (
    <div style={styles.page}>
      {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} style={styles.img} />}
      <h1>{recipe.title}</h1>
      <p style={styles.author}>by {recipe.author}</p>

      {user && (
        <button onClick={toggleFavorite} style={styles.favBtn}>
          {favorited ? "❤️ Unfavorite" : "🤍 Favorite"}
        </button>
      )}

      <h3>Ingredients</h3>
      <p style={styles.text}>{recipe.ingredients}</p>

      <h3>Instructions</h3>
      <p style={styles.text}>{recipe.instructions}</p>
    </div>
  );
}

const styles = {
  page: { padding: "24px", maxWidth: "700px", margin: "0 auto" },
  img: { width: "100%", maxHeight: "350px", objectFit: "cover", borderRadius: "8px", marginBottom: "16px" },
  author: { color: "#888", marginTop: "-8px" },
  text: { lineHeight: "1.7", whiteSpace: "pre-wrap" },
  favBtn: { padding: "8px 16px", background: "#ff6b35", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginBottom: "16px" },
};
