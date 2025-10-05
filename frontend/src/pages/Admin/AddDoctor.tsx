import { adminAssets } from "../../assets/adminAssets";
import { useForm } from "react-hook-form";
import { doctorSchema, type DoctorFormValues } from "../../utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const {backendUrl} = useContext(AppContext)
  const {user,token}=useContext(AuthContext)

  const { register, handleSubmit,formState:{errors},watch ,reset} = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      experience: "1 Year",
      speciality: "General physician"
    }
  });
const imageFile=watch("image");
const previewUrl=imageFile && imageFile.length>0 ? URL.createObjectURL(imageFile[0]) : adminAssets.upload_area;
  const onsubmit =async (data: DoctorFormValues) => {
    try {
      const formData = new FormData();
      if(data.image instanceof FileList && data.image.length>0){
        formData.append("image",data.image[0]);
      }
      Object.entries(data).forEach(([key,value]) => {
        if(key !== "image" && key !=="address1" && key !=="address2" && key !=="fees"){
          formData.append(key,value.toString());
        }

      })
      formData.append("fees",String(Number(data.fees)));
      formData.append("address",JSON.stringify({address1:data.address1,address2:data.address2}));

      formData.forEach((value,key) => {
        console.log(key,value);
      })
      const {data:response}=await axios.post(`${backendUrl}/api/admin/add-doctor`,formData,{
        headers:{
          Authorization:`Bearer ${token}`,
          "Content-Type":"multipart/form-data"
        }
      })
      if(response.success){
        toast.success(response.message);
        reset();
      }else {
        toast.error(response.message || "Failed to add doctor. Please try again."); 
      }
      console.log(response);
      // Submit the form data to the server
    } catch (error) {
      console.error("Error adding doctor:", error);
      toast.error("Failed to add doctor. Please try again.");
    }
    }
  return (
      <form className="m-5 w-full" onSubmit={handleSubmit(onsubmit)}>
        <p className="mb-3 text-lg font-medium">Add Doctor</p>
        <div className="bg-white px-8 py-8
         border border-gray-300 
         rounded w-full max-w-4xl
          max-h-[80vh] overflow-y-scroll">
          <div
          className="flex items-center gap-4 mb-8 text-gray-500"
          >
            <label htmlFor="doc-img">
              <img 
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={previewUrl || adminAssets.upload_area} alt="Upload Area" />
              <input type="file" id="doc-img" hidden
              {...register("image")}
               />
              <p>Upload doctor picture</p>
            </label>
            {errors.image?.message && <p className="text-red-500">{errors.image.message}</p>}
          </div>
          <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor name</p>
                <input
                 className="border border-gray-300 rounded px-3 py-2"
                 type="text" placeholder="Name" {...register("name")} />
                {errors.name?.message && <p className="text-red-500">{errors.name.message}</p>}
              </div>
              <div className="flex-1 flex flex-col gap-1 ">
                <p>Doctor email</p>
                <input
                    className="border border-gray-300 rounded px-3 py-2"
                 type="text" placeholder="Your Email" {...register("email")} />
                {errors.email?.message && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor Password</p>
                <input
                 className="border border-gray-300 rounded px-3 py-2"
                     type="password" placeholder="Your Password" {...register("password")} />
                {errors.password?.message && <p className="text-red-500">{errors.password.message}</p>}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor Experience</p>
                <select className="border border-gray-300 rounded px-3 py-2" {...register("experience")}>
                  <option value="1 Year"> 1 Year</option>
                  <option value="2 Year"> 2 Year</option>
                  <option value="3 Year"> 3 Year</option>
                  <option value="4 Year"> 4 Year</option>
                  <option value="5 Year"> 5 Year</option>
                  <option value="6 Year"> 6 Year</option>
                  <option value="7 Year"> 7 Year</option>
                  <option value="8 Year"> 8 Year</option>
                  <option value="9 Year"> 9 Year</option>
                  <option value="10 Year"> 10 Year</option>
                </select>
              {errors.experience?.message && <p className="text-red-500">{errors.experience.message}</p>}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Fees</p>
                <input
                 className="border border-gray-300 rounded px-3 py-2"
                 type="number" placeholder="Your Fees" {...register("fees")} />
                {errors.fees?.message && <p className="text-red-500">{errors.fees.message}</p>}
              </div>
            </div>
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <p className="">Speciality</p>
                <select className="border border-gray-300 rounded px-3 py-2" {...register("speciality")}>
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
                {errors.speciality?.message && <p className="text-red-500">{errors.speciality.message}</p>}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Degree</p>
                <input
                  className="border border-gray-300 rounded px-3 py-2"
                  type="text" placeholder="Degree" {...register("degree")} />
                {errors.degree?.message && <p className="text-red-500">{errors.degree.message}</p>}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Address</p>
                <input
                 className="border border-gray-300 rounded px-3 py-2"
                 type="text" placeholder="Address 1" {...register("address1")} />
                {errors.address1?.message && <p className="text-red-500">{errors.address1.message}</p>}
                <input
                 className="border border-gray-300 rounded px-3 py-2"
                 type="text" placeholder="Address 2" {...register("address2")} />
                {errors.address2?.message && <p className="text-red-500">{errors.address2.message}</p>}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <p className="mt-4 mb-2">About Doctor</p>
            <textarea
                className="border border-gray-300 rounded px-3 pt-2 w-full"
             rows={5} placeholder="Write about doctor" {...register("about")}></textarea>
            {errors.about?.message && <p className="text-red-500">{errors.about.message}</p>}
          </div>
          <button type="submit"
           className="bg-primary text-white px-10 py-3 mt-4 rounded-full">
            Add Doctor
          </button>
        </div>
      </form>

  );
};

export default AddDoctor;
