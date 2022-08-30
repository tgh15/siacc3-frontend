import { Get }      from "./get";
import { Create }   from "./create";
import { Update }   from "./update";
import { Delete }   from "./delete";


const RestrictAPI = {
    get     : Get,
    create  : Create,
    update  : Update,
    delete  : Delete
}

export default RestrictAPI;