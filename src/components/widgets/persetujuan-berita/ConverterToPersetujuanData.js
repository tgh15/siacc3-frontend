import moment from "moment";
import Avatar from "../avatar";
import defaultAvatar from "../default-image/DefaultAvatar";
import FeedsApproveDefaultData from "../feeds/feeds-approved-news/FeedsApproveDefaultData";


const formatData = FeedsApproveDefaultData[0]



const ConverterToPersetujuanData=(data)=>{
    let xtData = []
    let fmt = {...formatData}
    moment.locale("id")
    if(Array.isArray(data)){
        xtData = data.map(val=>{
            const {id,employee:{photo,name,position,workunit},created_at,title,location_name,what,when_:when,where,who,why,how} = val
            fmt = {
                id:id,
                account:name,
                division:`${position} ${workunit}`,
                avatar:photo==""? defaultAvatar:<Avatar img={photo}/>,
                location:location_name,
                text:`${when}, telah terjadi ${what}, bertempat di ${where} ${who}. Kejadian ini terjadi karena ${why}, ${how}`,
                title:title,
                timeUpdate:moment(created_at).calendar(),
                key:"list-persetujuan"+moment().format("YYYYMMDD")+id,
                agent_report:val
                
            }
            return fmt

        })
    }
    return xtData
}

export default ConverterToPersetujuanData;