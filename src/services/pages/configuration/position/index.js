
import { Create } from "./Create"
import { Delete } from "./Delete"
import { Filter } from "./Filter"
import { Get } from "./Get"
import { Update } from "./Update"


const PositionApi = {
    get:Get,
    create : Create,
    delete : Delete,
    update : Update,
    filter : Filter
    
}
export default PositionApi