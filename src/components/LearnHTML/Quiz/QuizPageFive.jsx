import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
            {quiz.o17 ? <button onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o17.value })
                {quizTotal >= 3 ? history.push('/quiz-results'): history.push('/quiz-failure')}
            }}>{quiz.o17.question}</button>: ''}
            {quiz.o18 ? <button onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o18.value })
                {quizTotal >= 3 ? history.push('/quiz-results'): history.push('/quiz-failure')}
            }}>{quiz.o18.question}</button> : ''}
            {quiz.o19 ? <button onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o19.value })
                {quizTotal >= 3 ? history.push('/quiz-results'): history.push('/quiz-failure')}
            }}>{quiz.o19.question}</button> : ''}
            {quiz.o20 ? <button onClick={() => {
                dispatch({ type: 'ADD_QUIZ_TOTAL', payload: quiz.o20.value })
                {quizTotal >= 3 ? history.push('/quiz-results'): history.push('/quiz-failure')}
                }}>{quiz.o20.question}</button> : ''}
        </div >
    );
}

export default QuizPageFive;