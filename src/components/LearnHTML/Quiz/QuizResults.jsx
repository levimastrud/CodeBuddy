import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CB_Happy from '../CodeBuddy Graphics/CB_Happy.svg'
import { Button } from '@mui/material';

function QuizResults(props) {
    const user = useSelector((store) => store.user);
    const quiz = useSelector((store) => store.quiz);
    const quizTotal = useSelector((store) => store.quizTotal);
    let quizTopic = quiz.topic;
    console.log('TOTAL', quizTotal)

    const dispatch = useDispatch();
    const history = useHistory()
    console.log('QUIZ TOPIC', quiz.topic)

    const resultsFunction = async () => {
        if (quizTotal > user[quizTopic]) {
            await axios.post(`api/user/${quiz.router}-quiz-total`, { quizTotal: quizTotal, userId: user.id })
            await user.recent_topic_completed > quiz.nextTopic ? '' : axios.post('/api/user/next-topic', { username: user.username, nextTopic: quiz.nextTopic })
            dispatch({ type: 'CLEAR_TOTAL' });
            history.push('/progression')
        } else {
            dispatch({ type: 'CLEAR_TOTAL' });
            history.push('/progression')
        }
    }

    useEffect(() => {
        dispatch({ type: 'GET_QUIZ' });
    }, [dispatch]);

    return (
        <div className='quiz'>
            <h1>Great job, {user.name}!</h1>
            <h1>Score: {quizTotal}</h1>
            <img src={CB_Happy} className = 'code-buddy-large'></img>
            <Button onClick={() => resultsFunction()}>Next</Button>
        </div >
    );
}

export default QuizResults;