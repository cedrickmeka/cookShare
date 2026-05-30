import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>🍳 CookShare</Link>
      <div>
        {user ? (
          <>
            <Link to="/dashboard" style={styles.link}>My Recipes</Link>
            <Link to="/create" style={styles.link}>+ New Recipe</Link>
            <span style={styles.link}>Hi, {user.username}</span>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", background: "#ff6b35", color: "white" },
  brand: { color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "1.3rem" },
  link: { color: "white", textDecoration: "none", marginLeft: "16px" },
  btn: { marginLeft: "16px", background: "white", color: "#ff6b35", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" },
};
