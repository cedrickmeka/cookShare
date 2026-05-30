import { useEffect, useState } from "react";
import api from "../services/api";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api.get("/recipes/").then((res) => setRecipes(res.data));
  }, []);

  return (
    <div style={styles.page}>
      <h1>🌍 Recipe Feed</h1>
      <p>Discover recipes from the community</p>
      <div style={styles.grid}>
        {recipes.map((r) => <RecipeCard key={r.id} recipe={r} />)}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "24px" },
  grid: { display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" },
};
