import { useAuth } from "../context/authInnerSystem";
import { Navigate } from "react-router-dom";

export  function ProtectRoute({children}) {
const {user,loading}= useAuth();
if (loading) return <h1>Loading</h1>;
if (!user)return <Navigate to='/Login' />;
  return <>{children}</>
}
