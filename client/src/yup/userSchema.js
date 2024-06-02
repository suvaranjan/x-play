import * as Yup from "yup";

// User Schema
const userSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    address: Yup.string().required("Address is required"),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    phone: Yup.string().required("Phone number is required"),
    age: Yup.number().required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    occupation: Yup.string().required("Occupation is required"),
    // profilePhoto: Yup.mixed().required("Profile Photo is required"),
});

export default userSchema;
