import * as yup from 'yup';

export const validation = yup.object().shape({
    name                : yup.string().required(),
    description         : yup.string().required(),
    position_type       : yup.number().required(),
    sector_id           : yup.number().required(),
    workunit_level_id   : yup.number().required()
}).required();

export default validation  ;