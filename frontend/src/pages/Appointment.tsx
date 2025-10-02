import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const daysOfWeek=["SUN","MON","TUE","WED","THU","FRI","SAT"]
  const { doctors ,currencySymbole} = useContext(AppContext);
  const [doctorInfo, setdoctorInfo] = useState<any>(null);
  const [doctorSlot, setDoctorSlot] = useState<any>([]);
  const [slotIndex, setSlotIndex] = useState<number>(0);
  const [slotTime, setSlotTime] = useState<string>("");
  const fetchDoctor = async () => {
    const doctor = doctors.find((doctor) => doctor._id === docId);
    setdoctorInfo(doctor);
  };
const getAvailableSlots = () => {
  let today = new Date();
  let allSlots: any[] = [];

  for (let i = 0; i < 7; i++) {
    let currentDate = new Date(today);
    currentDate.setDate(currentDate.getDate() + i);

    let endTime = new Date(currentDate);
    endTime.setHours(21, 0, 0, 0);

    // Today’s slots (round to next half-hour)
    if (i === 0) {
      if (today >= endTime) continue; // skip if past 9 PM
      let minutes = today.getMinutes();
      let nextHalfHour = minutes < 30 ? 30 : 0;
      let nextHour = minutes < 30 ? today.getHours() : today.getHours() + 1;
      currentDate.setHours(nextHour);
      currentDate.setMinutes(nextHalfHour);
    } else {
      currentDate.setHours(10);
      currentDate.setMinutes(0);
    }

    // Collect slots for this day
    let timeSlots: any[] = [];
    while (currentDate < endTime) {
      let formattedTime = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      timeSlots.push({
        datetime: new Date(currentDate),
        time: formattedTime,
      });
      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }

    if (timeSlots.length > 0) {
      allSlots.push(timeSlots);
    }
  }

  // ✅ update state once, no empty arrays
  setDoctorSlot(allSlots);
};


  useEffect(() => {
    fetchDoctor();
  }, [docId, doctors]);
  useEffect(() => {
  getAvailableSlots();
  }, [doctorInfo])
useEffect(() => {
console.log(doctorSlot)
}, [doctorSlot])


  return (
    doctorInfo && (
      <div>
        <div className="">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="">
              <img
              className="bg-primary w-full max-w-72 rounded-lg"
               src={doctorInfo.image} alt={doctorInfo.name} />
            </div>
            <div className="flex-1 border  border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
              <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                {doctorInfo.name}
                <img className="w-5" src={assets.verified_icon} alt="verified icon" />
              </p>
              <div className="flex items-center gap-2 text-sm mt-1 text-gray-600 ">
                <p className="">
                  {doctorInfo.degree}-{doctorInfo.speciality}
                </p>
                <button className="py-0.5 px-2 border text-xs rounded-full">{doctorInfo.experience} years</button>
              </div>
              <div className="">
                <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                  About
                  <img src={assets.info_icon} alt="info icon" />
                </p>
                <p className="text-sm text-gray-500 max-w-[700px] mt-1">{doctorInfo.about}</p>
              </div>
              <p className="text-gray-500 font-medium mt-4">Appointment fee: <span className="text-gray-600">{currencySymbole}{doctorInfo.fees}</span></p>
            </div>
          </div>
        </div>
        {/**Booking slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p className="">Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {doctorSlot.length && doctorSlot.map((item:any,index:any) => (
              <div
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex ===index ?"bg-primary text-white":"border-gray-200"}`}
               key={index} 
               onClick={() => setSlotIndex(index)}>
                <p className="">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p className="">{item[0] && item[0].datetime.getDate()}</p>
                </div>
            ))}
          </div>
          {/**Time slots */}
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {doctorSlot.length &&
              doctorSlot[slotIndex].map((item: any, index: any) => (
                <p 
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime ? "bg-primary text-white":"text-gray-400 border border-gray-300"}`} key={index}>
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button className="bg-primary rounded-full text-white text-sm font-light px-14 py-3 my-6">
            Book an Appointment
          </button>
        </div>
        {/**Related doctors */}
       {docId && <RelatedDoctors docId={docId} speciality={doctorInfo.speciality} />}
      </div>
    )
  );
};

export default Appointment;
