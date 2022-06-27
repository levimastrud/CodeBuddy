import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function FinalQuizSeven(props) {
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
            <h1>{quiz.question7}</h1>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o25.value })
                history.push('/final-quiz-eight')
            }}>{quiz.o25.question}</Button>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o26.value })
                history.push('/final-quiz-eight')
            }}>{quiz.o26.question}</Button>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o27.value })
                history.push('/final-quiz-eight')
            }}>{quiz.o27.question}</Button>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o28.value })
                history.push('/final-quiz-eight')
                }}>{quiz.o16.question}</Button>
        </div >
    );
}

export default FinalQuizSeven;