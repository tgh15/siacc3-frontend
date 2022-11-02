import { Create }       from "./Create"
import { Delete }       from "./Delete"
import { Filter }       from "./Filter"
import { 
    Get,
    GetMap, 
    GetById,
    GetChild, 
    GetByLevel, 
}                       from "./Get"
import { Update }       from "./Update"


const UnitWorkListApi = {
    get             : Get, 
    getMap          : GetMap,
    create          : Create,
    delete          : Delete,
    update          : Update,
    filter          : Filter,
    getById         : GetById,
    GetChild        : GetChild,
    getByLevel      : GetByLevel,
}
export default UnitWorkListApi