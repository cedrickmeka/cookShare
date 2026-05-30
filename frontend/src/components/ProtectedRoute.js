import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useUser();
  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/login" />;
}
