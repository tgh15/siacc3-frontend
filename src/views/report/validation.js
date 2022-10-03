import * as yup                 from 'yup';

export const schemaNoFormatNoSchedule = yup.object().shape({
    title            : yup.string().required('Kolom judul laporan belum terisi.'),
    start_date       : yup.array().min(1, 'Kolom tanggal awal belum terisi.').required('Kolom tanggal awal belum terisi.'),
    end_date         : yup.array().min(1, 'Kolom tanggal akhir belum terisi.').required('Kolom tanggal akhir belum terisi.'),
    content          : yup.array().of(yup.object().shape({ value : yup.string('Kolom isi laporan belum terisi'), label : yup.string('Kolom isi laporan belum terisi')})).min(1, 'Kolom isi laporan belum terisi').max(4, 'Kolom isi laporan hanya bisa dipilih maksimal 4 pilihan.').required('Kolom isi laporan belum terisi'),
    filter_category  : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom filter kategori belum terisi').required('Kolom filter kategori belum terisi'),
    
}).required();

export const schemaNoFormatWithSchedule = yup.object().shape({
    title            : yup.string().required('Kolom judul laporan belum terisi.'),
    start_date       : yup.array().min(1, 'Kolom tanggal awal belum terisi.').required('Kolom tanggal awal belum terisi.'),
    end_date         : yup.array().min(1, 'Kolom tanggal akhir belum terisi.').required('Kolom tanggal akhir belum terisi.'),
    content          : yup.array().of(yup.object().shape({ value : yup.string('Kolom isi laporan belum terisi'), label : yup.string('Kolom isi laporan belum terisi')})).min(1, 'Kolom isi laporan belum terisi').max(4, 'Kolom isi laporan hanya bisa dipilih maksimal 4 pilihan.').required('Kolom isi laporan belum terisi'),
    filter_category  : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom filter kategori belum terisi').required('Kolom filter kategori belum terisi'),
    time             : yup.array().min(1, 'Kolom tanggal akhir belum terisi.').required('Kolom tanggal akhir belum terisi.'),
    repeat           : yup.string().required('Kolom judul laporan belum terisi.'),
}).required();

export const schemaWithFormat = yup.object().shape({
    title            : yup.string().required('Kolom judul laporan belum terisi.'),
    start_date       : yup.array().min(1, 'Kolom tanggal awal belum terisi.').required('Kolom tanggal awal belum terisi.'),
    end_date         : yup.array().min(1, 'Kolom tanggal akhir belum terisi.').required('Kolom tanggal akhir belum terisi.'),
    format_type      : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom format laporan belum terisi').required('Kolom format laporan belum terisi'),
}).required();