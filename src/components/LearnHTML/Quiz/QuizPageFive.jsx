import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function QuizPageFive(props) {
    const user = useSelector((store) => store.user);
    const quiz = useSelector((store) => store.quiz);
    let quizTotal = useSelector((store) => store.quizTotal);
    console.log(quizTotal)

    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch({ type: 'GET_QUIZ'});
    }, [dispatch]);

    return (
        <div className='quiz'>
            <h1>{quiz.question5}</h1>
            {quiz.o17 ? <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o17.value })
                {quizTotal > 2 ? history.push('/quiz-results'): history.push('/quiz-failure')}
            }}>{quiz.o17.question}</Button>: ''}
            {quiz.o18 ? <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o18.value })
                {quizTotal > 2 ? history.push('/quiz-results'): history.push('/quiz-failure')}
            }}>{quiz.o18.question}</Button> : ''}
            {quiz.o19 ? <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o19.value })
                {quizTotal > 2 ? history.push('/quiz-results'): history.push('/quiz-failure')}
            }}>{quiz.o19.question}</Button> : ''}
            {quiz.o20 ? <Button style={{
                borderRadius: 35,
                backgroundColor: "#76a3db"
            }} variant = "contained" onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o20.value })
                {quizTotal > 2 ? history.push('/quiz-results'): history.push('/quiz-failure')}
                }}>{quiz.o20.question}</Button> : ''}
        </div >
    );
}

export default QuizPageFive;