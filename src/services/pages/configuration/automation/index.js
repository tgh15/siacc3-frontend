import { Delete, Get, Post, Put } from "../../../core/request";



export const AutomationURL = {
    automation: "automation",
    prefix: "feeds",
    all: "all",
    statement: "statement",
    operator: "operator",
    then: "then",
    create: "create",
    delete: "delete",
    result: "result",
    filter: "filter",
    get: "get",
    update: "update"
};


const getAll = () => Get(`${AutomationURL.prefix}/${AutomationURL.automation}/${AutomationURL.all}`);
const getDetail = data => Post(`${AutomationURL.prefix}/${AutomationURL.automation}/${AutomationURL.get}/${AutomationURL.automation}`, data);
const getStatement = () => Get(`${AutomationURL.prefix}/${AutomationURL.automation}/${AutomationURL.statement}`);
const getOperator = () => Get(`${AutomationURL.prefix}/${AutomationURL.automation}/${AutomationURL.operator}`);
const getthen = () => Get(`${AutomationURL.prefix}/${AutomationURL.automation}/${AutomationURL.then}`);
const create = data => Post(`${AutomationURL.prefix}/${AutomationURL.automation}/${AutomationURL.create}`, data);
const update = data => Put(`${AutomationURL.prefix}/${AutomationURL.automation}/${AutomationURL.update}`, data);
const remove = id => Delete(`${AutomationURL.prefix}/${AutomationURL.automation}/${AutomationURL.delete}?id=${id}`);
const result = data => Post(`${AutomationURL.prefix}/${AutomationURL.automation}/${AutomationURL.result}`, data);
const resultFilter = data => Post(`${AutomationURL.prefix}/${AutomationURL.automation}/${AutomationURL.result}/${AutomationURL.filter}`, data);

const AutomationApi = {
    getAll: getAll,
    getStatement: getStatement,
    getOperator: getOperator,
    getthen: getthen,
    create: create,
    remove: remove,
    result: result,
    resultFilter: resultFilter,
    getDetail : getDetail,
    update: update
}
export default AutomationApi