import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function QuizPageOne(props) {
    const user = useSelector((store) => store.user);
    const quiz = useSelector((store) => store.quiz);
    console.log(quiz)

    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch({ type: 'GET_QUIZ' });
    }, [dispatch]);

    return (
        <div className='quiz'>
            <h1>{quiz.question1}</h1>
            <button onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o1.value })
                history.push('/quiz-page-two')
            }}>{quiz.o1.question}</button>
            <button onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o2.value })
                history.push('/quiz-page-two')
            }}>{quiz.o2.question}</button>
            <button onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o3.value })
                history.push('/quiz-page-two')
            }}>{quiz.o3.question}</button>
            <button onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o4.value })
                history.push('/quiz-page-two')
                }}>{quiz.o4.question}</button>
        </div >
    );
}

export default QuizPageOne;