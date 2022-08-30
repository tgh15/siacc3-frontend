// **  Initial State
const initialState = {
    feeds:null,
    approveds:null,
    attachments:[],
    interactions:[],
}

const FeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FEED_LISTS":
      return{
        ...state,
        feeds:action.value
      }
    case "SET_APPROVED_LISTS":
      return{
        ...state,
        approveds:action.value
      }
    case "SET_AGENT_REPORT_ATTACHMENTS":
      return{
        ...state,
        attachments:action.value

      }
    case "SET_INTERACTIONS":
      return{
        ...state,
        interactions:action.value
      }
    default:
      return state
  }
}

export default FeedReducer
