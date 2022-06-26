import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function QuizPageFour(props) {
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
            <h1>{quiz.question4}</h1>
            <Button variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o13.value })
                history.push('/quiz-page-five')
            }}>{quiz.o13.question}</Button>
            <Button variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o14.value })
                history.push('/quiz-page-five')
            }}>{quiz.o14.question}</Button>
            <Button variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o15.value })
                history.push('/quiz-page-five')
            }}>{quiz.o15.question}</Button>
            <Button variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o16.value })
                history.push('/quiz-page-five')
                }}>{quiz.o16.question}</Button>
        </div >
    );
}

export default QuizPageFour;