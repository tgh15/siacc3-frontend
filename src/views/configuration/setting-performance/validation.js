import * as yup from 'yup';

export const validationEvent = yup.object().shape({
    title           : yup.string().required('Kolom Judul Belum Terisi.'),
    note            : yup.string().required('Kolom Keterangan Belum Terisi.'),
    kind            : yup.string().required('Kolom Jika Belum Terisi.'),
    condition       : yup.string().required('Kolom Relasi Belum Terisi.'),
    target_value    : yup.number('Kolom Hanya Bisa Diisi Angka.').required('Kolom Target Nilai Belum Terisi.'),
    points          : yup.number('Kolom Hanya Bisa Diisi Angka.').required('Kolom Point Belum Terisi.'),
    workunit_id     : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom Satuan Kerja Belum Terisi.').required('Kolom Satuan Kerja Belum Terisi.'),

}).required();

export const validationNotEvent = yup.object().shape({
    title           : yup.string().required('Kolom Judul Belum Terisi.'),
    note            : yup.string().required('Kolom Keterangan Belum Terisi.'),
    kind            : yup.string().required('Kolom Jika Belum Terisi.'),
    condition       : yup.string().required('Kolom Relasi Belum Terisi.'),
    target_value    : yup.number('Kolom Hanya Bisa Diisi Angka.').required('Kolom Target Nilai Belum Terisi.'),
    points          : yup.number('Kolom Hanya Bisa Diisi Angka.').required('Kolom Point Belum Terisi.'),
}).required();