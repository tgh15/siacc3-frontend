import * as yup from 'yup';

export const validationRating = yup.object().shape({
    basic_leader: yup.number("Isian Hanya Berupa Angka").min(1, "Isian Harus Lebih dari 0").required("Isian Belum Terisi"),
    basic_agent: yup.number("Isian Hanya Berupa Angka").min(1, "Isian Harus Lebih dari 0").required("Isian Belum Terisi"),
    trending_leader: yup.number("Isian Hanya Berupa Angka").min(1, "Isian Harus Lebih dari 0").required("Isian Belum Terisi"),
    trending_agent: yup.number("Isian Hanya Berupa Angka").min(1, "Isian Harus Lebih dari 0").required("Isian Belum Terisi"),
}).required();

export default validationRating;