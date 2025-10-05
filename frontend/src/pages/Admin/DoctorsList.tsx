import { useContext } from "react"
import { AppContext } from "../../context/AppContext"

const DoctorsList = () => {
  const {doctors} = useContext(AppContext);
if(doctors.length===0){
  return <div className="text-center text-gray-500 mt-10">No doctors found.</div>
}


}
export default DoctorsList;