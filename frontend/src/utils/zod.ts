import {z} from "zod";
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email:z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const loginSchema = z.object({
  email:z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 6 characters"),
});
export const doctorSchema=z.object({
  name:z.string().min(3,"Name must be at least 3 characters"),
  email:z.email("Invalid email"),
  password:z.string().min(8,"Password must be at least 8 characters"),
  experience:z.string().nonempty("Experience is required"),
  fees:z.string().min(1,"Fees must be more than 0"),
  speciality:z.string().nonempty("Speciality is required"),
  degree:z.string().nonempty("Degree is required"),
  address1:z.string().nonempty("Address 1 is required"),
  address2:z.string().nonempty("Address 2 is required"),
  about:z.string().min(10,"About must be at least 10 characters"),
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, { message: "Image is required" })
    .refine(
      (files) => !files[0] || files[0].size <= 2 * 1024 * 1024,
      { message: "Image must be smaller than 2MB" }
    )
    .refine(
      (files) =>
        !files[0] || ["image/jpeg", "image/png"].includes(files[0].type),
      { message: "Only JPG/PNG files are allowed" }
    ),})

export type DoctorFormValues=z.infer<typeof doctorSchema>;
export interface User {
  _id:string,
  name:string,
  email:string,
  role:string,
}

export interface AuthState {
    user:User | null,
    token:string | null,
    loading:boolean,
    error:null | string
}