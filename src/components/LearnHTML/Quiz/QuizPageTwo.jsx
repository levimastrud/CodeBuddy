import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material'

function QuizPageTwo(props) {
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
            <h1>{quiz.question2}</h1>
            <Button variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o5.value })
                history.push('/quiz-page-three')
            }}>{quiz.o5.question}</Button>
            <Button variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o6.value })
                history.push('/quiz-page-three')
            }}>{quiz.o6.question}</Button>
            <Button variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o7.value })
                history.push('/quiz-page-three')
            }}>{quiz.o7.question}</Button>
            <Button variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o8.value })
                history.push('/quiz-page-three')
                }}>{quiz.o8.question}</Button>
        </div >
    );
}

export default QuizPageTwo;