import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { NavLink } from "react-router";
import { adminAssets } from "../../assets/adminAssets";
import { is } from "zod/locales";


const Sidebar = () => {
    const { user } = useContext(AuthContext);
  return (
    <div className="  h-full  bg-white border-r border-gray-300 ">
        {
            user && <ul className="text-[#515151] mt-5">
                <NavLink
                className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary":""}`}
                 to="/admin/admin-dashboard" >
                    <img src={adminAssets.home_icon} alt="home icon" />
                    <p>Dashboard</p>
                </NavLink>
                <NavLink 
                className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary":""}`}
                to="/admin/all-appointments" >
                    <img src={adminAssets.appointment_icon} alt="appointment icon" />
                    <p>Appointments</p>
                </NavLink>
                <NavLink
                className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary":""}`}
                 to="/admin/add-doctor" >
                    <img src={adminAssets.add_icon} alt="add icon" />
                    <p>Add Doctor</p>
                </NavLink>
                <NavLink
                className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary":""}`}
                 to="/admin/doctors-list" >
                    <img src={adminAssets.people_icon} alt="people icon" />
                    <p>Doctors List</p>
                </NavLink>
                 
            </ul>
        }
    </div>
  )
}

export default Sidebar