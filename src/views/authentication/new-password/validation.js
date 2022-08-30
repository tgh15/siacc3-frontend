import * as yup from 'yup';

export const validation = yup.object().shape({
    password: yup.string().min(8, "Password Minimal 8 karakter").required("Isian Password Belum Terisi"),
    repeat_password: yup.string()
        .required('Isian Ulangi Password Belum Terisi')
        .oneOf([yup.ref('password')], 'Password Tidak Sama')
}).required();

export default validation;