import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function QuizPageThree(props) {
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
            <h1>{quiz.question3}</h1>
            <button onClick={() => history.push('/quiz-page-four')}>{quiz.o9.question}</button>
            <button onClick={() => history.push('/quiz-page-four')}>{quiz.o10.question}</button>
            <button onClick={() => history.push('/quiz-page-four')}>{quiz.o11.question}</button>
            <button onClick={() => history.push('/quiz-page-four')}>{quiz.o12.question}</button>
        </div >
    );
}

export default QuizPageThree;