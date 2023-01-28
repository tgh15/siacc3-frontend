import * as yup from 'yup';

export const schema = yup.object().shape({
    by              : yup.object().shape({ value : yup.string().required('Kolom jenis analisis belum terisi'), label : yup.string().required('Kolom jenis analisis belum terisi')}).required('Kolom jenis analisis belum terisi'),
    to              : yup.array().min(1, 'Tanggal selesai belum terisi').required('Tanggal selesai belum terisi'),
    from            : yup.array().min(1, 'Tanggal mulai belum terisi').required('Tanggal mulai belum terisi'),
    title           : yup.string().required('Kolom judul analisis belum terisi'),
    keyword         : yup.string().required('Kolom topik analisis belum terisi'),
    location        : yup.string().required('Kolom tempat analisis belum terisi'),
},['update_password','update_repeat_password']).required();

export default  schema;