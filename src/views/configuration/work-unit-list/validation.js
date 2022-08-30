import * as yup from 'yup'

    export const validation = yup.object().shape({
        code                : yup.string().max(10, 'Jumlah maksimal karakter adalah 10!').required(),
        name                : yup.string().required(),
        email               : yup.string().email(),
        address             : yup.string().required(),
        latitude            : yup.string().required(),
        longitude           : yup.string().required(),
        description         : yup.string().required(),
        workunit_level_id   : yup.string().required()    
    }).required();

    export default validation