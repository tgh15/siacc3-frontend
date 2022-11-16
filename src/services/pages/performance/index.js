import { Get, Post }                from '../../core/request';
import { GetAgent }                 from './GetAgent';
import { AgentPoints }              from './AgentPoints';
import { GetWorkunit }              from './GetWorkunit';
import { GetAgentDetail }           from './GetAgentDetail';
import { WorkunitPoints }           from './WorkunitPoints';
import { GetWorkunitDetail }        from './GetWorkunitDetail';
import { GetAgentByWorkunit }       from './GetAgentByWorkunit';
import { AgentPointsDeduction }     from './AgentPointsDeduction';
import { WorkunitPointsDeduction }  from './WorkunitPointsDeduction';

export const FeedURL = {
    feedPrefix  : "feeds",
    performance : "performance",
    agent       : "agent",
    workunit    : "workunit"
}

const workunitByParent          = ({ data, page }) => Post(`${FeedURL.feedPrefix}/${FeedURL.performance}/${FeedURL.workunit}?&page=${page}`, data);
const agentByWorkunitAndChild   = ({ workunit_id, workunit_level_id, page }) => Get(`${FeedURL.feedPrefix}/${FeedURL.performance}/${FeedURL.agent}?condition_by=workunit&page=${page}&workunit_id=${workunit_id}&workunit_level_id=${workunit_level_id}`);


const PerformanceApi = {
    GetAgent                    : GetAgent,
    agentPoints                 : AgentPoints,
    GetWorkunit                 : GetWorkunit,
    getAgetDetail               : GetAgentDetail,
    workunitPoints              : WorkunitPoints,
    workunitByParent            : workunitByParent,
    getWorkunitDetail           : GetWorkunitDetail,
    GetAgentByWorkUnit          : GetAgentByWorkunit,
    agentPointsDeduction        : AgentPointsDeduction,
    workunitPointsDeduction     : WorkunitPointsDeduction,
    agentByWorkunitAndChild     : agentByWorkunitAndChild,
}

export default PerformanceApi