const quizReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_QUIZ':
            return action.payload;
        case 'GET_QUIZ':
            return state;
        default:
            return state;
    }
};

export default quizReducer;