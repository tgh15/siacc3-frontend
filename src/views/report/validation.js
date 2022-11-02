import * as yup                 from 'yup';

export const schema = yup.object().shape({
    report_type      : yup.string().required('Kolom jenis laporan belum terisi.'),
}).required();

export const schema2 = yup.object().shape({
    report_kind      : yup.string().required('Kolom periode laporan belum terisi.'),
}).required();

export const schema3 = yup.object().shape({
    workunit_kind      : yup.object().shape({ value : yup.string().required('Kolom satuan kerja belum terisi'), label : yup.string().required('Kolom satuan kerja belum terisi')}),
}).required();


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

//monthly validation
export const schemaFormatMonthlyLevel1 = yup.object().shape({
    year             : yup.object().shape({ value : yup.string().required('Kolom tahun belum terisi'), label : yup.string().required('Kolom tahun belum terisi')}),
    month            : yup.object().shape({ value : yup.string().required('Kolom bulan belum terisi'), label : yup.string().required('Kolom bulan belum terisi')}),
    report_body      : yup.object().shape({ value : yup.string().required('Kolom isi laporan belum terisi'), label : yup.string().required('Kolom isi laporan belum terisi')}),
}).required();

export const schemaFormatMonthlyLevel2 = yup.object().shape({
    year             : yup.object().shape({ value : yup.string().required('Kolom tahun belum terisi'), label : yup.string().required('Kolom tahun belum terisi')}),
    month            : yup.object().shape({ value : yup.string().required('Kolom bulan belum terisi'), label : yup.string().required('Kolom bulan belum terisi')}),
    report_body      : yup.object().shape({ value : yup.string().required('Kolom isi laporan belum terisi'), label : yup.string().required('Kolom isi laporan belum terisi')}),
    workunit_level_2 : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom kejaksaan tinggi belum terisi').required('Kolom kejaksaan tinggi belum terisi'),
}).required();

export const schemaFormatMonthlyLevel3 = yup.object().shape({
    year             : yup.object().shape({ value : yup.string().required('Kolom tahun belum terisi'), label : yup.string().required('Kolom tahun belum terisi')}),
    month            : yup.object().shape({ value : yup.string().required('Kolom bulan belum terisi'), label : yup.string().required('Kolom bulan belum terisi')}),
    report_body      : yup.object().shape({ value : yup.string().required('Kolom isi laporan belum terisi'), label : yup.string().required('Kolom isi laporan belum terisi')}),
    workunit_level_2 : yup.object().shape({ value : yup.string().required('Kolom kejaksaan tinggi belum terisi'), label : yup.string().required('Kolom kejaksaan tinggi belum terisi')}),
    workunit_level_3 : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom kejaksaan negeri belum terisi').required('Kolom kejaksaan negeri belum terisi'),
}).required();

export const schemaFormatMonthlyLevel4 = yup.object().shape({
    year             : yup.object().shape({ value : yup.string().required('Kolom tahun belum terisi'), label : yup.string().required('Kolom tahun belum terisi')}),
    month            : yup.object().shape({ value : yup.string().required('Kolom bulan belum terisi'), label : yup.string().required('Kolom bulan belum terisi')}),
    report_body      : yup.object().shape({ value : yup.string().required('Kolom isi laporan belum terisi'), label : yup.string().required('Kolom isi laporan belum terisi')}),
    workunit_level_2 : yup.object().shape({ value : yup.string().required('Kolom kejaksaan tinggi belum terisi'), label : yup.string().required('Kolom kejaksaan tinggi belum terisi')}),
    workunit_level_3 : yup.object().shape({ value : yup.string().required('Kolom kejaksaan negeri belum terisi'), label : yup.string().required('Kolom kejaksaan negeri belum terisi')}),
    workunit_level_4 : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom cabang kejaksaan negeri belum terisi').required('Kolom cabang kejaksaan negeri belum terisi'),
}).required();

//quarterly validation
export const schemaFormatQuarterlyLevel1 = yup.object().shape({
    year             : yup.object().shape({ value : yup.string().required('Kolom tahun belum terisi'), label : yup.string().required('Kolom tahun belum terisi')}),
    report_body      : yup.object().shape({ value : yup.string().required('Kolom isi laporan belum terisi'), label : yup.string().required('Kolom isi laporan belum terisi')}),
    quarter_type     : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom triwulan belum terisi').required('Kolom triwulan belum terisi'),
}).required();

export const schemaFormatQuarterlyLevel2 = yup.object().shape({
    year             : yup.object().shape({ value : yup.string().required('Kolom tahun belum terisi'), label : yup.string().required('Kolom tahun belum terisi')}),
    report_body      : yup.object().shape({ value : yup.string().required('Kolom isi laporan belum terisi'), label : yup.string().required('Kolom isi laporan belum terisi')}),
    quarter_type     : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom triwulan belum terisi').required('Kolom triwulan belum terisi'),
    workunit_level_2 : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom kejaksaan tinggi belum terisi').required('Kolom kejaksaan tinggi belum terisi'),
}).required();

export const schemaFormatQuarterlyLevel3 = yup.object().shape({
    year             : yup.object().shape({ value : yup.string().required('Kolom tahun belum terisi'), label : yup.string().required('Kolom tahun belum terisi')}),
    report_body      : yup.object().shape({ value : yup.string().required('Kolom isi laporan belum terisi'), label : yup.string().required('Kolom isi laporan belum terisi')}),
    quarter_type     : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom triwulan belum terisi').required('Kolom triwulan belum terisi'),
    workunit_level_2 : yup.object().shape({ value : yup.string().required('Kolom kejaksaan tinggi belum terisi'), label : yup.string().required('Kolom kejaksaan tinggi belum terisi')}),
    workunit_level_3 : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom kejaksaan negeri belum terisi').required('Kolom kejaksaan negeri belum terisi'),
}).required();

export const schemaFormatQuarterlyLevel4 = yup.object().shape({
    year             : yup.object().shape({ value : yup.string().required('Kolom tahun belum terisi'), label : yup.string().required('Kolom tahun belum terisi')}),
    report_body      : yup.object().shape({ value : yup.string().required('Kolom isi laporan belum terisi'), label : yup.string().required('Kolom isi laporan belum terisi')}),
    quarter_type     : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom triwulan belum terisi').required('Kolom triwulan belum terisi'),
    workunit_level_2 : yup.object().shape({ value : yup.string().required('Kolom kejaksaan tinggi belum terisi'), label : yup.string().required('Kolom kejaksaan tinggi belum terisi')}),
    workunit_level_3 : yup.object().shape({ value : yup.string().required('Kolom kejaksaan negeri belum terisi'), label : yup.string().required('Kolom kejaksaan negeri belum terisi')}),
    workunit_level_4 : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom cabang kejaksaan negeri belum terisi').required('Kolom cabang kejaksaan negeri belum terisi'),
}).required();

//yearly validation
export const schemaFormatYearlylyLevel1 = yup.object().shape({
    year             : yup.object().shape({ value : yup.string().required('Kolom tahun belum terisi'), label : yup.string().required('Kolom tahun belum terisi')}),
    report_body      : yup.object().shape({ value : yup.string().required('Kolom isi laporan belum terisi'), label : yup.string().required('Kolom isi laporan belum terisi')}),
}).required();

export const schemaFormatYearlylyLevel2 = yup.object().shape({
    year             : yup.object().shape({ value : yup.string().required('Kolom tahun belum terisi'), label : yup.string().required('Kolom tahun belum terisi')}),
    report_body      : yup.object().shape({ value : yup.string().required('Kolom isi laporan belum terisi'), label : yup.string().required('Kolom isi laporan belum terisi')}),
    workunit_level_2 : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom kejaksaan tinggi belum terisi').required('Kolom kejaksaan tinggi belum terisi'),
}).required();

export const schemaFormatYearlylyLevel3 = yup.object().shape({
    year             : yup.object().shape({ value : yup.string().required('Kolom tahun belum terisi'), label : yup.string().required('Kolom tahun belum terisi')}),
    report_body      : yup.object().shape({ value : yup.string().required('Kolom isi laporan belum terisi'), label : yup.string().required('Kolom isi laporan belum terisi')}),
    workunit_level_2 : yup.object().shape({ value : yup.string().required('Kolom kejaksaan tinggi belum terisi'), label : yup.string().required('Kolom kejaksaan tinggi belum terisi')}),
    workunit_level_3 : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom kejaksaan negeri belum terisi').required('Kolom kejaksaan negeri belum terisi'),
}).required();

export const schemaFormatYearlylyLevel4 = yup.object().shape({
    year             : yup.object().shape({ value : yup.string().required('Kolom tahun belum terisi'), label : yup.string().required('Kolom tahun belum terisi')}),
    report_body      : yup.object().shape({ value : yup.string().required('Kolom isi laporan belum terisi'), label : yup.string().required('Kolom isi laporan belum terisi')}),
    workunit_level_2 : yup.object().shape({ value : yup.string().required('Kolom kejaksaan tinggi belum terisi'), label : yup.string().required('Kolom kejaksaan tinggi belum terisi')}),
    workunit_level_3 : yup.object().shape({ value : yup.string().required('Kolom kejaksaan negeri belum terisi'), label : yup.string().required('Kolom kejaksaan negeri belum terisi')}),
    workunit_level_4 : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom cabang kejaksaan negeri belum terisi').required('Kolom cabang kejaksaan negeri belum terisi'),
}).required();

//periodically validation
export const schemaFormatPeriodicallyLevel1 = yup.object().shape({
    end_date         : yup.array().min(1, 'Kolom tanggal selesai belum terisi').required('Kolom tanggal selesai belum terisi'),
    start_date       : yup.array().min(1, 'Kolom tanggal awal belum terisi').required('Kolom tanggal awal belum terisi'),
    report_body      : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom isi laporan belum terisi').required('Kolom isi laporan belum terisi'),
}).required();

export const schemaFormatPeriodicallyLevel2 = yup.object().shape({
    end_date         : yup.array().min(1, 'Kolom tanggal selesai belum terisi').required('Kolom tanggal selesai belum terisi'),
    start_date       : yup.array().min(1, 'Kolom tanggal awal belum terisi').required('Kolom tanggal awal belum terisi'),
    report_body      : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom isi laporan belum terisi').required('Kolom isi laporan belum terisi'),
    workunit_level_2 : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom kejaksaan tinggi belum terisi').required('Kolom kejaksaan tinggi belum terisi'),
}).required();

export const schemaFormatPeriodicallyLevel3 = yup.object().shape({
    end_date         : yup.array().min(1, 'Kolom tanggal selesai belum terisi').required('Kolom tanggal selesai belum terisi'),
    start_date       : yup.array().min(1, 'Kolom tanggal awal belum terisi').required('Kolom tanggal awal belum terisi'),
    report_body      : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom isi laporan belum terisi').required('Kolom isi laporan belum terisi'),
    workunit_level_2 : yup.object().shape({ value : yup.string().required('Kolom kejaksaan tinggi belum terisi'), label : yup.string().required('Kolom kejaksaan tinggi belum terisi')}),
    workunit_level_3 : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom kejaksaan negeri belum terisi').required('Kolom kejaksaan negeri belum terisi'),
}).required();

export const schemaFormatPeriodicallyLevel4 = yup.object().shape({
    end_date         : yup.array().min(1, 'Kolom tanggal selesai belum terisi').required('Kolom tanggal selesai belum terisi'),
    start_date       : yup.array().min(1, 'Kolom tanggal awal belum terisi').required('Kolom tanggal awal belum terisi'),
    report_body      : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom isi laporan belum terisi').required('Kolom isi laporan belum terisi'),
    workunit_level_2 : yup.object().shape({ value : yup.string().required('Kolom kejaksaan tinggi belum terisi'), label : yup.string().required('Kolom kejaksaan tinggi belum terisi')}),
    workunit_level_3 : yup.object().shape({ value : yup.string().required('Kolom kejaksaan negeri belum terisi'), label : yup.string().required('Kolom kejaksaan negeri belum terisi')}),
    workunit_level_4 : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom cabang kejaksaan negeri belum terisi').required('Kolom cabang kejaksaan negeri belum terisi'),
}).required();