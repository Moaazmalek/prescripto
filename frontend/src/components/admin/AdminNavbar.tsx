import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { adminAssets } from "../../assets/adminAssets"

const AdminNavbar = () => {
  const {user,logout}=useContext(AuthContext)
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-300 bg-white ">
      <div className="flex items-center gap-2 text-xs">
        <img
        className="w-36 sm:w-40 cursor-pointer"
         src={adminAssets.admin_logo} alt="Admin logo" />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">{user?.role ? "admin":"doctor"}</p>
      </div>
      <button 
      onClick={() => logout()}
      className="bg-primary text-white text-sm px-10 py-2 rounded-full">Logout</button>
    </div>
  )
}

export default AdminNavbar