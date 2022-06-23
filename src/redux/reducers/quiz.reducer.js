const quizReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_QUIZ':
            return action.payload;
        case 'GET_QUIZ':
            return state;
        case 'CLEAR_QUIZ':
            return [];
        default:
            return state;
    }
};

export default quizReducer;