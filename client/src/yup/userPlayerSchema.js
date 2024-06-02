import * as Yup from 'yup';

const userPlayerSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Full Name is required')
        .min(2, 'Full Name is too short')
        .max(50, 'Full Name is too long'),
    address: Yup.string()
        .required('Address is required')
        .min(5, 'Address is too short'),
    dateOfBirth: Yup.date()
        .required('Date of Birth is required')
        .max(new Date(), 'Date of Birth cannot be in the future'),
    phone: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    age: Yup.number()
        .required('Age is required')
        .min(0, 'Age cannot be negative')
        .max(120, 'Age cannot exceed 120 years'),
    gender: Yup.string()
        .required('Gender is required')
        .oneOf(['Male', 'Female', 'Other'], 'Invalid gender'),
    occupation: Yup.string()
        .required('Occupation is required')
        .min(2, 'Occupation is too short')
        .max(50, 'Occupation is too long'),
    // profilePhoto: Yup.mixed()
    //     .required('Profile Photo is required')
    //     .test('fileSize', 'File size is too large', value => value && value.size <= 5000000) // 5MB
    //     .test('fileFormat', 'Unsupported file format', value => value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)),
    yearsOfExperience: Yup.number()
        .required('Years of Experience is required')
        .min(0, 'Years of Experience cannot be negative')
        .max(50, 'Years of Experience cannot exceed 50 years'),
    hoursPlayedPerWeek: Yup.number()
        .required('Hours Played Per Week is required')
        .min(0, 'Hours Played Per Week cannot be negative')
        .max(168, 'Hours Played Per Week cannot exceed 168 hours'),
    titlesOwn: Yup.string()
        .required('Titles Own is required')
        .max(100, 'Titles Own is too long'),
    titlesWithSpecificTeamName: Yup.string()
        .required('Titles With Specific Team Name is required')
        .max(100, 'Titles With Specific Team Name is too long'),
    strikerPositionScore: Yup.number()
        .required('Striker Position Score is required')
        .min(1, 'Striker Position Score must be at least 1')
        .max(100, 'Striker Position Score cannot exceed 100'),
    wingerPositionScore: Yup.number()
        .required('Winger Position Score is required')
        .min(1, 'Winger Position Score must be at least 1')
        .max(100, 'Winger Position Score cannot exceed 100'),
    midfielderPositionScore: Yup.number()
        .required('Midfielder Position Score is required')
        .min(1, 'Midfielder Position Score must be at least 1')
        .max(100, 'Midfielder Position Score cannot exceed 100'),
    wingDefenderPositionScore: Yup.number()
        .required('Wing Defender Position Score is required')
        .min(1, 'Wing Defender Position Score must be at least 1')
        .max(100, 'Wing Defender Position Score cannot exceed 100'),
    centralBackPositionScore: Yup.number()
        .required('Central Back Position Score is required')
        .min(1, 'Central Back Position Score must be at least 1')
        .max(100, 'Central Back Position Score cannot exceed 100'),
});

export default userPlayerSchema;
