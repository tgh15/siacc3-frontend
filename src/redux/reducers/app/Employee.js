const initialState = {
    workUnits:[]
  }


const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'WORKUNIT_SET':
            return { ...state, workUnits: action.value }
        default:
            return state
    }
}

export default employeeReducer