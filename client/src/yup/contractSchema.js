import * as Yup from 'yup';

const contractSchema = Yup.object().shape({
    teamRole: Yup.string()
        .required('Team Role is required')
        .min(2, 'Team Role must be at least 2 characters')
        .max(50, 'Team Role cannot exceed 50 characters'),
    teamRolePeriod: Yup.string()
        .required('Team Role Period is required')
        .min(2, 'Team Role Period must be at least 2 characters')
        .max(50, 'Team Role Period cannot exceed 50 characters'),
    teamRoleName: Yup.string()
        .required('Team Role Name is required')
        .min(2, 'Team Role Name must be at least 2 characters')
        .max(50, 'Team Role Name cannot exceed 50 characters'),
    startDate: Yup.date()
        .required('Start Date is required')
        .nullable(),
    period: Yup.string()
        .required('Period is required')
        .min(1, 'Period must be at least 1 character')
        .max(20, 'Period cannot exceed 20 characters'),
    borrowFee: Yup.number()
        .required('Borrow Fee is required')
        .min(0, 'Borrow Fee cannot be negative'),
    sellingFee: Yup.number()
        .required('Selling Fee is required')
        .min(0, 'Selling Fee cannot be negative'),
    commissionOnRenting: Yup.number()
        .required('Commission on Renting is required')
        .min(0, 'Commission on Renting cannot be negative'),
    commissionOnWinning: Yup.number()
        .required('Commission on Winning is required')
        .min(0, 'Commission on Winning cannot be negative'),
    jerseyNumber: Yup.string()
        .required('Jersey Number is required')
        .min(1, 'Jersey Number must be at least 1 character')
        .max(10, 'Jersey Number cannot exceed 10 characters'),
});

export default contractSchema;
