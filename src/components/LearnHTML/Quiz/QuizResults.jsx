import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function QuizResults(props) {
    const user = useSelector((store) => store.user);
    const quiz = useSelector((store) => store.quiz);
    const quizTotal = useSelector((store) => store.quizTotal);
    console.log(quizTotal)

    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch({ type: 'GET_QUIZ'});
    }, [dispatch]);

    return (
        <div className='quiz'>
            <h1>Score</h1>
            <h1>{quizTotal}</h1>
            <button onClick={() => {
                dispatch({ type: 'QUIZ_TOTAL'});
                history.push('/progression')
            }}>Next</button>
        </div >
    );
}

export default QuizResults;