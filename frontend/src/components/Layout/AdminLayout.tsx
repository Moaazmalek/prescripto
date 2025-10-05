import { Outlet } from "react-router"

const AdminLayout = () => {
  return (
    <div className="bg-primary/20">
        <Outlet/>
    </div>
  )
}

export default AdminLayout