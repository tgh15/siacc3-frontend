import * as yup from 'yup'

export const validation = yup.object().shape({
    sequence: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    // attachment: yup.string().required(),
}).required();


export default  validation 