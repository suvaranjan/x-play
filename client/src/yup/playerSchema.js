import * as Yup from "yup";

// Player Schema
const playerSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    address: Yup.string().required("Address is required"),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    phone: Yup.string().required("Phone number is required"),
    age: Yup.number().required("Age is required"),
    occupation: Yup.string().required("Occupation is required"),
    jobContractTillWhen: Yup.date().required("Job Contract Till When is required"),
    // profilePhoto: Yup.mixed().required("Profile Photo is required"),
    yearsOfExperience: Yup.number().required("Years of Experience is required"),
    hoursPlayedPerWeek: Yup.number().required("Hours Played Per Week is required"),
    titlesOwn: Yup.string().required("Titles Own is required"),
    titlesWithSpecificTeamName: Yup.string().required("Titles with Specific Team Name is required"),
    strikerPositionScore: Yup.number().min(1).max(100).required("Striker Position Score is required"),
    wingerPositionScore: Yup.number().min(1).max(100).required("Winger Position Score is required"),
    midfielderPositionScore: Yup.number().min(1).max(100).required("Midfielder Position Score is required"),
    wingDefenderPositionScore: Yup.number().min(1).max(100).required("Wing Defender Position Score is required"),
    centralBackPositionScore: Yup.number().min(1).max(100).required("Central Back Position Score is required"),
});

export default playerSchema;
