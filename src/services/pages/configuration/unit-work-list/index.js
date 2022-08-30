import { Create } from "./Create"
import { Delete } from "./Delete"
import { Filter } from "./Filter"
import { Get,GetById,GetByLevel, GetMap, GetChild } from "./Get"
import { Update } from "./Update"


const UnitWorkListApi = {
    get:Get, 
    getById : GetById,
    getByLevel : GetByLevel,
    GetChild : GetChild,
    getMap : GetMap,
    create : Create,
    delete : Delete,
    update : Update,
    filter : Filter   
}
export default UnitWorkListApi