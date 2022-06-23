import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function QuizResults(props) {
    const user = useSelector((store) => store.user);
    const quiz = useSelector((store) => store.quiz);
    const quizTotal = useSelector((store) => store.quizTotal);
    let quizTopic = quiz.topic;
    console.log('TOTAL', quizTotal)

    const dispatch = useDispatch();
    const history = useHistory()

    const resultsFunction = () => {
        if (quizTotal > user[quizTopic]) {
            axios.post('api/user/elements-quiz-total', { quizTotal: quizTotal, userId: user.id })
            user.recent_topic_completed > 2 ? '' : axios.post('/api/user/next-topic', { username: user.username, nextTopic: quiz.nextTopic })
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
            <h1>Score</h1>
            <h1>{quizTotal}</h1>
            <button onClick={() => resultsFunction()}>Next</button>
        </div >
    );
}

export default QuizResults;