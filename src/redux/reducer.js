export const initialState = {
  players: [],
  filters: {
    name: "",
    position: "Position",
    age: ""
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ALL':
      return {
        ...state,
        players: [...action.payload]
      };
    case 'APPLY_FILTERS':
      return {
        ...state,
        filters: {...action.payload}
      };
    default:
      return state;
  }
}

export default reducer;