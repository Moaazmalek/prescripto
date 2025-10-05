import { Outlet } from "react-router"
import Navbar from "../Navbar"
import Footer from "../Footer"


const UserLayout = () => {

  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default UserLayout