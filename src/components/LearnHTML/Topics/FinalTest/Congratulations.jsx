import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Congratulations
() {
    const user = useSelector((store) => store.user);
    const history = useHistory()

    let quizOptions = {
        topic: 'forms_results',
        router: 'forms',
        nextTopic: 7,
        // First Question
        question1: 'What is a good way to tell the user what to put in an input?',
        o1: {question: 'Labels', value: 1},
        o2: {question: `With code comments`, value: 0},
        o3: {question: 'With styline', value: 0},
        o4: {question: 'Placeholders', value: 1},
        // Second Question
        question2: 'What do we have to give an input in order to use labels?',
        o5: {question: `Class`, value: 0},
        o6: {question: `Label`, value: 0},
        o7: {question: 'Id', value: 1},
        o8: {question: 'Href', value: 0},
        // Third Question
        question3: 'What type of tags go inside a form to allow user input?',
        o9: {question:`<input>`, value: 1},
        o10: {question: `<data>`, value: 0},
        o11: {question: `<href>`, value: 0},
        o12: {question: `<submit>`, value: 0},
        // Fourth Question
        question4: 'Which form is written correctly?',
        o13: {question: `<input> <label> </label> </input>`, value: 0},
        o14: {question: '<form> <label> </label> </form>', value: 0},
        o15: {question: `<form> <input> </input> </form>`, value: 1},
        o16: {question: '<form> <input> <input> <form>', value: 0},
        // Fifth Question
        question5: 'Inputs have a closing tag.',
        o17: {question: 'True', value: 0},
        o18: {question: 'False', value: 1},
    }

    const isReady = () => {
        if (answer === 'Correct') {
            dispatch({ type: 'SET_QUIZ', payload: quizOptions });
            dispatch({ type: 'SET_ANSWER', payload: '' });
            history.push('/quiz-page-one');
        } else {
            console.log('stay here')
        }
    }
    
    return (
        <div className="quiz">
            <h1>Congratulations, {user.name}!</h1>
            <h3>Code Buddy is so proud of you!</h3>
            <h3>Only one final test separates you from completing the Learn HTML course!</h3>
            <h3>Good luck! You got it!</h3>
            <button onClick={() => {
                 // Stops user from backwards progression
                user.recent_topic_completed > 10 ? '' : axios.post('/api/user/next-topic', {username: user.username, nextTopic: 10})
                history.push('/final-test')
                }
            }
            >Finish Topic</button>
        </div >
    );
}

export default Congratulations
;