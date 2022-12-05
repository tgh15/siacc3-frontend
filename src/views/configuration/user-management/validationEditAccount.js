import * as yup from 'yup';

export const schemaEdit = yup.object().shape({
    identity_id     : yup.string().typeError('Hanya bisa memasukkan angka').min(10, 'Jumlah minimal karakter adalah 10!').required(),
    name            : yup.string().required('Kolom nama belum terisi'),
    ktp             : yup.number().typeError('Hanya bisa memasukkan angka').integer().min(10, 'Jumlah minimal karakter adalah 10!').required(),
    phone_number    : yup.number().typeError('Hanya bisa memasukkan angka').integer().min(10, 'Jumlah minimal karakter adalah 10!').required(),
    email           : yup.string().matches('^[A-Za-z0-9._%+-]+@kejaksaan\.go.id$', 'Silahkan menggunakan email kejaksaan.').required(),
    address         : yup.string().required('Kolom alamat belum terisi'),
    sector_id       : yup.object().shape({ value : yup.string().required('Kolom struktur/bidang belum terisi'), label : yup.string().required('Kolom struktur/bidang belum terisi')}),
    workunit_id     : yup.object().shape({ value : yup.string().required('Kolom satuan kerja belum terisi'), label : yup.string().required('Kolom satuan kerja belum terisi')}),
    username        : yup.string().matches('^[A-Za-z0-9._]*$', 'Username hanya bisa menggunakan huruf, angka, titik(.), garis bawah(_) dan tidak boleh menggunakan spasi').required('Kolom username belum terisi'),
    position_id     : yup.object().shape({ value : yup.string().required('Kolom jabatan belum terisi'), label : yup.string().required('Kolom jabatan belum terisi')}),
    user_group      : yup.object().shape({ value : yup.string().required('Kolom privilage belum terisi'), label : yup.string().required('Kolom privilage belum terisi')}),
    old_password           : yup.string()
        .min(8, 'Minimal 8 karakter')
        .required('Password lama perlu diisi.'),
    update_password        : yup.string(),
        // .min(8, 'Minimal 8 karakter')
        // .notOneOf([yup.ref('old_password')], "Password baru tidak boleh sama dengan password lama"),
        // .required('Kolom password baru belum dimasukkan!'),
    update_repeat_password : yup.string().when('update_password',{
        is: (value) => value.length > 1,
        then: yup.string()
        // .min(8, 'Minimal 8 karakter')
        .oneOf([yup.ref('update_password')], 'Password tidak sesuai')
        .required('Kolom ulangi password baru belum dimasukkan!')
    }),
},['update_password','update_repeat_password']).required();

export const schemaEditAdmin = yup.object().shape({
    identity_id     : yup.string().typeError('Hanya bisa memasukkan angka').min(10, 'Jumlah minimal karakter adalah 10!').required(),
    name            : yup.string().required('Kolom nama belum terisi'),
    ktp             : yup.number().typeError('Hanya bisa memasukkan angka').integer().min(10, 'Jumlah minimal karakter adalah 10!').required(),
    phone_number    : yup.number().typeError('Hanya bisa memasukkan angka').integer().min(10, 'Jumlah minimal karakter adalah 10!').required(),
    email           : yup.string().matches('^[A-Za-z0-9._%+-]+@kejaksaan\.go.id$', 'Silahkan menggunakan email kejaksaan.').required(),
    username        : yup.string().matches('^[A-Za-z0-9._]*$', 'Username hanya bisa menggunakan huruf, angka, titik(.), garis bawah(_) dan tidak boleh menggunakan spasi').required('Kolom username belum terisi'),
    address         : yup.string().required('Kolom alamat belum terisi'),
    sector_id       : yup.object().shape({ value : yup.string().required('Kolom struktur/bidang belum terisi'), label : yup.string().required('Kolom struktur/bidang belum terisi')}),
    workunit_id     : yup.object().shape({ value : yup.string().required('Kolom satuan kerja belum terisi'), label : yup.string().required('Kolom satuan kerja belum terisi')}),
    position_id     : yup.object().shape({ value : yup.string().required('Kolom jabatan belum terisi'), label : yup.string().required('Kolom jabatan belum terisi')}),
    user_group      : yup.object().shape({ value : yup.string().required('Kolom privilage belum terisi'), label : yup.string().required('Kolom privilage belum terisi')}),
    update_password        : yup.string(),
        // .min(8, 'Minimal 8 karakter')
        // .required('Kolom password baru belum dimasukkan!'),
    update_repeat_password : yup.string().when('update_password',{
        is      : (value) => value.length > 1,
        then    : yup.string()
        // .min(8, 'Minimal 8 karakter')
        .oneOf([yup.ref('update_password')], 'Password tidak sesuai')
        .required('Kolom ulangi password baru belum dimasukkan!')
    }),
},['update_password','update_repeat_password']).required();
