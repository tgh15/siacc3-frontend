// **  Initial State
const initialState = {
      activeCategories:{id:"all",name:"Semua"},
      categories:null,
  }
  
  const FeedsCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_ACTIVE_CATEGORIES":
        return{
          ...state,
          activeCategories:action.value
        }
      case "SET_CATEGORIES":
        return{
          ...state,
          categories:action.value
        }
      default:
        return state
    }
  }
  
  export default FeedsCategoriesReducer
  