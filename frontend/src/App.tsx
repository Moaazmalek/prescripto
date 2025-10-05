import { Navigate, Outlet, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Doctors from "./pages/Doctors"
import Login from "./pages/Login"
import About from "./pages/About"
import Contact from "./pages/Contact"
import MyProfile from "./pages/MyProfile"
import MyAppointments from "./pages/MyAppointments"
import Appointment from "./pages/Appointment"
import UserLayout from "./components/Layout/UserLayout"
import Register from "./pages/register"
import ProtectedRoute from "./components/admin/ProtectedRoute"
import Dashboard from "./pages/Admin/Dashboard"
import AllAppointments from "./pages/Admin/AllAppointments"
import AddDoctor from "./pages/Admin/AddDoctor"
import DoctorsList from "./pages/Admin/DoctorsList"
import {useDispatch, useSelector} from 'react-redux'
import type { AppDispatch ,RootState} from "./redux/store"
import { useEffect } from "react"
import { fetchCurrentUser } from "./redux/slices/authSlice"


const App = () => {
 const dispatch=useDispatch<AppDispatch>()
 const {user,token}=useSelector((state:RootState) => state.auth)
 useEffect(() => {
  if( token && !user) dispatch(fetchCurrentUser())
 }, [user,dispatch,token])
 
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<UserLayout/>} >
        <Route index element={<Home/>} />
        <Route path="/doctors" element={<Doctors/>} />
        <Route path="/doctors/:speciality" element={<Doctors/>} />
        <Route path="/login" element={ user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={ user ? <Navigate to="/" /> : <Register />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/my-profile" element={<MyProfile/>} />
        <Route path="/my-appointments" element={<MyAppointments/>} />
        <Route path="/appointment/:docId" element={<Appointment/>} />
        </Route>
        <Route path="/admin"
         element={<ProtectedRoute allowedRoles={["admin"]} >
          <Outlet/>
         </ProtectedRoute>}
         >
          {/* <Route index element={} /> */}
          <Route  path="admin-dashboard" element={<Dashboard/>} />
          <Route path="all-appointments" element={<AllAppointments/>} />
          <Route path="add-doctor" element={<AddDoctor/>} />
          <Route path="doctors-list" element={<DoctorsList/>} />
         </Route>
          
      </Routes>
     
    
    </div>
  )
}

export default App