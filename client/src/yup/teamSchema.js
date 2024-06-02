import * as Yup from 'yup';

const teamSchema = Yup.object().shape({
    name: Yup.string()
        .required('Team name is required'),
    description: Yup.string()
        .required('Team description is required')
        .test(
            'min-words',
            'Description must be at least 40 words',
            function (value) {
                if (!value) return false;
                const wordCount = value.split(' ').filter(word => word.length > 0).length;
                return wordCount >= 40;
            }
        ),
    location: Yup.string()
        .required('Team location is required'),
    socialLinks: Yup.array().of(
        Yup.object().shape({
            platform: Yup.string()
                .required('Platform is required'),
            link: Yup.string()
                .url('Link must be a valid URL')
                .required('Link is required')
        })
    ),
    // teamPoster: Yup.mixed()
    // .required('Team poster is required'),
});

export default teamSchema;
