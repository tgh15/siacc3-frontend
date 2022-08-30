import * as yup from 'yup'

export const CreateFolderValidation = yup.object().shape({
    name: yup.string().required(),
}).required();


export default CreateFolderValidation  