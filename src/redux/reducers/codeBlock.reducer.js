const codeBlockReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CODE_BLOCK':
        return action.payload;
      case 'GET_CODE_BLOCK':
        return state;
      default:
        return state;
    }
  };
  
  export default codeBlockReducer;
  