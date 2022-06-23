const quizTotalReducer = (state = 0, action) => {
    switch (action.type) {
        case 'CLEAR_TOTAL':
            console.log('newState', newState)
            return newState;
        case 'ADD_QUIZ_TOTAL':
            let newState = state + action.payload;
            return newState;
        default:
            return state;
    }
};

export default quizTotalReducer;