const answerReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ANSWER':
            return action.payload;
        case 'GET_ANSWER':
            return state;
        default:
            return state;
    }
};

export default answerReducer;