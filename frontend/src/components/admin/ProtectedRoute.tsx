import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return (
    <div className="bg-[#F8F9FD] w-full min-h-screen flex flex-col">
      <AdminNavbar />
      <div className="flex flex-1">
        <div className="flex items-start ">
          <Sidebar />
        </div>
        <div className=" w-full">{children}</div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
