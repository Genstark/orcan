const initialState = {
    stack: "Auth",
    userId: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "UPDATE_STACK":
        return {
          ...state,
          stack: action.payload,
        };
      case "UPDATE_USER_ID": {
        return {
          ...state,
          userId: action.payload,
        };
      }
      default:
        return state;
    }
  };
  export default reducer;