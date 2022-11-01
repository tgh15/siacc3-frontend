//API
// import CategoriesApi                                    from "../../services/pages/feeds/categories"
import { feedsCategoryAPI }                             from "../../services/pages/feeds/categories"
import AgentReportAPI                                   from "../../services/pages/feeds/agent-reports"
import { defaultUid }                                   from "../../services/core/default"

//Component
import { newsByStatus }                                 from "../../components/widgets/feeds/news-card-widget/NewsConfig"
import { getAgentReportFilter, getAgentReportLists }    from "../../components/widgets/feeds/news-card-widget/NewsConfig"
import CustomToast from "../../components/widgets/custom-toast"

export function getCategories(){
    const promise = new Promise((resolve,reject)=>{
        feedsCategoryAPI.getCategory().then(
            res => {
                resolve(res);
            }
        ).catch(
            err => {
                reject(err);
            }
        )
    })
    return promise
}

export function getAgentReport(page = 1,category){
    let cats  = category == null || category == undefined ? null : category
    let pages = page == undefined || page == null ? 1 : page
    return getAgentReportLists(pages,cats);
}

export function getApprovedBerandaFeeds(){
    if(localStorage.getItem('role') && localStorage.getItem('role').toLowerCase() === 'verifikator pusat'){
        return newsByStatus(1);
    }else{
        return newsByStatus(0);
    }
}

export function filterAgentReport(page,options){
    const pages = page==null||page==undefined?1:page

    return getAgentReportFilter(pages,options)
}

export function StoreNews(id,isSaved){
    
    const param_post = {
        uuid            : defaultUid,
        agent_report_id : id,
    }

    const param_delete = {
        agent_report_id : id
    }

    if(isSaved){
        return AgentReportAPI.changeAgentReportToStored(param_post).then(
            res => {
                CustomToast('success', "Berhasil simpan berita");
            }
        )
    }else{
        return AgentReportAPI.deleteAgentReportFromStored(param_delete).then(
            res => {
                CustomToast('success', "Berhasil hapus berita tersimpan");
            }
        )
    }
}

export function agentReportChangeToArchive(id){

    const formData = {
        agent_report_id : id
    };

    return AgentReportAPI.changeAgentReportToArchive(formData);
}