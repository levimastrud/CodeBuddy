import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function FinalQuizFive(props) {
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
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o17.value })
                history.push('/final-quiz-six')
            }}>{quiz.o17.question}</Button>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o18.value })
                history.push('/final-quiz-six')
            }}>{quiz.o18.question}</Button>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o19.value })
                history.push('/final-quiz-six')
            }}>{quiz.o19.question}</Button>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o20.value })
                history.push('/final-quiz-six')
                }}>{quiz.o16.question}</Button>
        </div >
    );
}

export default FinalQuizFive;