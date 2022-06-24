import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function QuizFailure(props) {
    const user = useSelector((store) => store.user);
    const quiz = useSelector((store) => store.quiz);
    const quizTotal = useSelector((store) => store.quizTotal);
    console.log(quiz)

    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch({ type: 'GET_QUIZ' });
    }, [dispatch]);

    return (
        <div className='quiz'>
            <h1>Better luck next time, {user.name}!</h1>
            <h1>A score of 3 is needed to proceed</h1>
            <h3>Your score: {quizTotal}</h3>
            <button onClick={() => {
                dispatch({type: 'CLEAR_TOTAL'});
                history.push('/quiz-page-one');
                }}>Retry quiz</button>
        </div >
    );
}

export default QuizFailure;