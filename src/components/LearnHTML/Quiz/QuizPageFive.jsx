import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function QuizPageFive(props) {
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
            <h1>{quiz.question5}</h1>
            <button onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o17.value })
                history.push('/quiz-results')
            }}>{quiz.o17.question}</button>
            <button onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o18.value })
                history.push('/quiz-results')
            }}>{quiz.o18.question}</button>
            <button onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o19.value })
                history.push('/quiz-results')
            }}>{quiz.o19.question}</button>
            <button onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o20.value })
                history.push('/quiz-results')
                }}>{quiz.o20.question}</button>
        </div >
    );
}

export default QuizPageFive;