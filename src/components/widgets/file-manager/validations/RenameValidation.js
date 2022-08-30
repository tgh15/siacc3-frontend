import * as yup from 'yup'

export const RenameValidation = yup.object().shape({
    name: yup.string().required()
            .notOneOf([yup.ref('old_name')], "New Name must can't be same old Name")
    .required('New Password is required'),
    
            
}).required();


export default RenameValidation  