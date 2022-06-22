import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
            <button onClick={() => history.push('/quiz-page-five')}>{quiz.o13.question}</button>
            <button onClick={() => history.push('/quiz-page-five')}>{quiz.o14.question}</button>
            <button onClick={() => history.push('/quiz-page-five')}>{quiz.o15.question}</button>
            <button onClick={() => history.push('/quiz-page-five')}>{quiz.o16.question}</button>
        </div >
    );
}

export default QuizPageFour;