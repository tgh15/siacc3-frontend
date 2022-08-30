import * as yup from 'yup';

export const validation = yup.object().shape({
    title           : yup.string().required(),
    note            : yup.string().required(),
    kind            : yup.string().required(),
    condition       : yup.string().required(),
    target_value    : yup.number().required(),
    points          : yup.number().required(),
    // workunit_id : yup.object().required()
}).required();

export default  validation ;