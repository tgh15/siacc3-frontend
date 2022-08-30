import * as yup from 'yup';

export const validationTrophy = yup.object().shape({
    name: yup.string().required("Isian Belum Terisi"),
    points: yup.number("Isian Hanya Berupa Angka").min(1,"Isian Harus Lebih dari 0").required("Isian Belum Terisi"),
}).required();

export default validationTrophy;