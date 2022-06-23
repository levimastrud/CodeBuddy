import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function QuizPageThree(props) {
    const user = useSelector((store) => store.user);
    const quiz = useSelector((store) => store.quiz);
    console.log(quiz)

    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch({ type: 'GET_QUIZ'});
    }, [dispatch]);

    return (
        <div className='quiz'>
            <h1>{quiz.question3}</h1>
            <button onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o9.value })
                history.push('/quiz-page-four')
            }}>{quiz.o9.question}</button>
            <button onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o10.value })
                history.push('/quiz-page-four')
            }}>{quiz.o10.question}</button>
            <button onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o11.value })
                history.push('/quiz-page-four')
            }}>{quiz.o11.question}</button>
            <button onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o12.value })
                history.push('/quiz-page-four')
                }}>{quiz.o12.question}</button>
        </div >
    );
}

export default QuizPageThree;