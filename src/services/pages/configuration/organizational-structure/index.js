import { employeeURL } from '../../../index';
import { Post }        from '../../../core/request';


const getStructure = (data) => Post(`${employeeURL.employeePrefix}/position/filter`, data);


const OrganizationalStructureAPI = {
    getStructure
}

export default OrganizationalStructureAPI;