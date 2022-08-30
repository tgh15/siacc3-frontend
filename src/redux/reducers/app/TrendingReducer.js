// **  Initial State
const initialState = {
    national:null,
    local:null
}

const trendingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NATIONAL_TRENDING":
      return{
        ...state,
        national:action.value
      }
    case "SET_LOCAL_TRENDING":
      return{
        ...state,
        local:action.value
      }
    
    default:
      return state
  }
}

export default trendingReducer
