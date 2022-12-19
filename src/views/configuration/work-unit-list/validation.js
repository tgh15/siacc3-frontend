import * as yup from 'yup';

export const validation = yup.object().shape({
    code                : yup.string().max(10, 'Jumlah maksimal karakter adalah 10!').required("Kolom ID belum terisi"),
    name                : yup.string().required("Kolom nama belum terisi"),
    // email               : yup.string().email().required("Kolom email belum terisi"),
    address             : yup.string().required("Kolom alamat belum terisi"),
    latitude            : yup.string().required("Kolom garis lintang belum terisi"),
    longitude           : yup.string().required("Kolom garis bujur belum terisi"),
    description         : yup.string().required("Kolom deskripsi belum terisi"),
    workunit_level_id   : yup.object().shape({ value : yup.string().required('Kolom tingkatan kejaksaan belum terisi'), label : yup.string().required('Kolom tingkatan kejaksaan belum terisi')}),  
}).required();

export default validation;