import * as yup from 'yup';

export const validation = yup.object().shape({
    name                : yup.string().required('Kolom nama belum terisi'),
    description         : yup.string().required('Kolom deskripsi belum terisi'),
    position_type       : yup.object().shape({ value : yup.string().required('Kolom tipe jabatan belum terisi'), label : yup.string().required('Kolom tipe jabatan belum terisi')}),
    sector_id           : yup.object().shape({ value : yup.string().required('Kolom unit kerja belum terisi'), label : yup.string().required('Kolom unit kerja belum terisi')}),
    workunit_level_id   : yup.object().shape({ value : yup.string().required('Kolom satuan kerja belum terisi'), label : yup.string().required('Kolom satuan kerja belum terisi')}),
}).required();

export default validation  ;