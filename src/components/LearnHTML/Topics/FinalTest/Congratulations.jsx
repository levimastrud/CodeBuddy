import axios from 'axios';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Congratulations
() {
    const user = useSelector((store) => store.user);
    const history = useHistory()
    const dispatch = useDispatch();

    let quizOptions = {
        topic: 'final_results',
        router: 'final',
        nextTopic: 10,
        // First Question
        question1: 'What typically goes between opening and closing tags?',
        o1: {question: 'Nothing', value: 0},
        o2: {question: 'Styling', value: 0},
        o3: {question: 'Text or other tags', value: 1},
        o4: {question: 'JavaScript', value: 0},
        // Second Question
        question2: 'What is the main difference between ordered lists and unordered lists?',
        o5: {question: 'Ordered lists number each item', value: 1},
        o6: {question: 'Nothing, they are the same', value: 0},
        o7: {question: 'Unordered is randomly sorted', value: 0},
        o8: {question: 'The only difference is the tags', value: 0},
        // Third Question
        question3: 'When would the alt attribute be useful?',
        o9: { question: `When you aren't sure what you want the image to be`, value: 0 },
        o10: { question: `To describe what the image would be if the page doesn't load`, value: 1 },
        o11: { question: 'To specify how big an image should be', value: 0 },
        o12: { question: 'When you want to link to a gif or video', value: 0 },
        // Fourth Question
        question4: 'What does the href attribute do?',
        o13: {question: 'Opens the link in a new window', value: 0},
        o14: {question: 'Specifies the text of the link', value: 0},
        o15: {question: 'Specifies where the link will go', value: 0},
        o16: {question: 'Provides a source for an image', value: 0},
        // Fifth Question
        question5: 'How do you target an ID?',
        o17: {question: `By putting a '.' before the targeting`, value: 0},
        o18: {question: 'Using a target attribute in the HTML', value: 0},
        o19: {question: `By putting a '#' before the targeting`, value: 1},
        o20: {question: 'Next to the color specification', value: 0},
        // Sixth Question
        question6: 'How would you style all classes named ‘santa-clause’ to be red?',
        o21: {question: `#santa-clause { color: red; }`, value: 0},
        o22: {question: `color { santa-clause: red }`, value: 0},
        o23: {question: '.santa-clause { color: red; }', value: 1},
        o24: {question: 'santa-clause { color: red; }', value: 0},
        // Seventh Question
        question7: 'What do we have to give an input in order to use labels?',
        o25: {question: `Class`, value: 0},
        o26: {question: `Label`, value: 0},
        o27: {question: 'Id', value: 1},
        o28: {question: 'Href', value: 0},
        // Eigth Question
        question8: 'What type of tags go inside a form to allow user input?',
        o29: {question:`<input>`, value: 1},
        o30: {question: `<data>`, value: 0},
        o31: {question: `<href>`, value: 0},
        o32: {question: `<submit>`, value: 0},
        // Ninth Question
        question9: 'How do you create a table row?',
        o33: {question: `<row>`, value: 0},
        o34: {question: `<th>`, value: 0},
        o35: {question: '<tr>', value: 1},
        o36: {question: '<td>', value: 0},
        // Tenth Question
        question10: 'Which is the proper order of elements?',
        o37: {question: 'Table -> Tr -> Thead -> Tr', value: 0},
        o38: {question: 'Table -> Thead -> Tr -> Td', value: 1},
        o39: {question: 'Table -> Tr -> Thead -> Tbody', value: 0},
        o40: {question: 'Table -> Thead -> Tr -> Th', value: 1}
    }

    const isReady = () => {
        if (answer === 'Correct') {
            dispatch({ type: 'SET_QUIZ', payload: quizOptions });
            dispatch({ type: 'SET_ANSWER', payload: '' });
            
        } else {
            console.log('stay here')
        }
    }
    
    return (
        <div className="quiz">
            <h1>Congratulations, {user.name}!</h1>
            <h3>Only one final test separates you from completing the Learn HTML course!</h3>
            <h3>Good luck! You got it!</h3>
            <button onClick={() => {
                 // Stops user from backwards progression
                // user.recent_topic_completed > 10 ? '' : axios.post('/api/user/next-topic', {username: user.username, nextTopic: 10})
                dispatch({ type: 'SET_QUIZ', payload: quizOptions });
                dispatch({ type: 'SET_ANSWER', payload: '' });
                history.push('/final-quiz-one');
                }
            }
            >Finish Topic</button>
        </div >
    );
}

export default Congratulations
;