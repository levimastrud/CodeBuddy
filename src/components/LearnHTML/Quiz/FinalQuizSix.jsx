import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function FinalQuizSix(props) {
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
            <h1>{quiz.question6}</h1>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o21.value })
                history.push('/final-quiz-seven')
            }}>{quiz.o21.question}</Button>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o22.value })
                history.push('/final-quiz-seven')
            }}>{quiz.o22.question}</Button>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o23.value })
                history.push('/final-quiz-seven')
            }}>{quiz.o23.question}</Button>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o24.value })
                history.push('/final-quiz-seven')
                }}>{quiz.o24.question}</Button>
        </div >
    );
}

export default FinalQuizSix;