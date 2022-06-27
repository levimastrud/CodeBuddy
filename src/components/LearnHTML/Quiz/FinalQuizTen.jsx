import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function FinalQuizTen(props) {
    const user = useSelector((store) => store.user);
    const quiz = useSelector((store) => store.quiz);
    let quizTotal = useSelector((store) => store.quizTotal);
    console.log(quiz)

    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch({ type: 'GET_QUIZ'});
    }, [dispatch]);

    return (
        <div className='quiz'>
            <h1>{quiz.question10}</h1>
            {quiz.o17 ? <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o37.value })
                .then(quizTotal > 5 ? history.push('/final-quiz-results'): history.push('/final-quiz-failure'));
            }}>{quiz.o37.question}</Button>: ''}
            {quiz.o18 ? <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o38.value })
                .then(quizTotal > 5 ? history.push('/final-quiz-results'): history.push('/final-quiz-failure'));
            }}>{quiz.o38.question}</Button> : ''}
            {quiz.o19 ? <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o39.value })
                .then(quizTotal > 5 ? history.push('/final-quiz-results'): history.push('/final-quiz-failure'));
            }}>{quiz.o39.question}</Button> : ''}
            {quiz.o50 ? <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o40.value })
                .then(quizTotal > 5 ? history.push('/final-quiz-results'): history.push('/final-quiz-failure'));
                }}>{quiz.o40.question}</Button> : ''}
        </div >
    );
}

export default FinalQuizTen;