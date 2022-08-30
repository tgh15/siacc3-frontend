import { AuthGroup, AuthGroupList } from "./AuthGroup"
import { KindAchievement } from "./KindAchievement"
import { Position, PositionList } from "./Position"
import { Sector } from "./Sector"
import { Workunit, WorkunitLevelList } from "./Workunit"
import { WorkUnitLevel } from "./WorkUnitLevel"


const SelectOptionsService = {
    workUnitLevel:WorkUnitLevel,
    position : Position,
    positionList : PositionList,
    sector : Sector,
    workunit : Workunit,
    authGroup : AuthGroup,
    authGroupList : AuthGroupList,
    kindAchievement : KindAchievement,
}
export default SelectOptionsService