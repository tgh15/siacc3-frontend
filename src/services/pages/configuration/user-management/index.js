import { CheckRequest, CheckPassword } from "./CheckRequest"
import { Create } from "./Create"
import { Delete } from "./Delete"
import { EditAccount } from "./EditAccount"
import Filter from "./Filter"
import { Get } from "./Get"
import { LeaderList, List } from "./List"
import { ResetDevice } from "./ResetDevice"
import { Status } from "./Status"
import { Update } from "./Update"


const UserManagementApi = {
    get             : Get, 
    list            : List,
    create          : Create,
    delete          : Delete,
    status          : Status,
    update          : Update,
    filter          : Filter,
    leaderList      : LeaderList,
    EditAccount     : EditAccount,
    resetDevice     : ResetDevice,
    checkRequest    : CheckRequest,
    checkPassword   : CheckPassword
}

export default UserManagementApi