import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function FinalQuizEight(props) {
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
            <h1>{quiz.question8}</h1>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o29.value })
                history.push('/final-quiz-nine')
            }}>{quiz.o29.question}</Button>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o30.value })
                history.push('/final-quiz-nine')
            }}>{quiz.o30.question}</Button>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o31.value })
                history.push('/final-quiz-nine')
            }}>{quiz.o31.question}</Button>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o32.value })
                history.push('/final-quiz-nine')
                }}>{quiz.o32.question}</Button>
        </div >
    );
}

export default FinalQuizEight;