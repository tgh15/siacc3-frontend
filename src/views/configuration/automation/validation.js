import * as yup from 'yup';

export const validation = yup.object().shape({
    title: yup.string().required("Judul Belum Terisi"),
    repeat: yup.string().required(),
    auto_then: yup.number().required().moreThan(0, "Tindakan Belum Terisi"),
    condition: yup.number().required().moreThan(0, "Kondisi Belum Terisi"),
    relation: yup.number().required().moreThan(0, "Relasi Belum Terisi"),
    value: yup.string().required("Nilai Belum Terisi"),
}).required();

export default validation;