import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lesson from '../../Lesson/Lesson';
import Quiz from '../../Quiz/QuizPageOne';

function Buttons() {
    const user = useSelector((store) => store.user);
    const answer = useSelector((store) => store.answer);
    const history = useHistory()
    const dispatch = useDispatch();

    const checkAnswer = (codeBlock) => {

        const parser = new DOMParser();
        const parsed = parser.parseFromString(codeBlock, "text/html");
        let parsedExpanded = parsed.lastChild.lastChild.childNodes;

        // Logs used for programming check answer logic 

        console.log('parse expanded length:', parsedExpanded.length)
        console.log('parse expanded:', parsedExpanded)
        console.log('parsed', parsed.lastChild.lastChild)
        console.log('Parsed Node Name goes here ->',)

        // Determines whether or not codeBlock is correct.
        // This will need to be modified for every different topic.

        try {
            if (parsedExpanded.length < 3) {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
            if (parsedExpanded[1].childNodes[11].attributes[0].nodeName === 'type' && parsedExpanded[1].childNodes[11].attributes[1].nodeName === 'value') {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            } else if (parsedExpanded[1].childNodes[11].attributes[1].nodeName === 'type' && parsedExpanded[1].childNodes[11].attributes[0].nodeName === 'value') {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            }
             else {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
        } catch {
            dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
        }
    }

    let lesson = `
    When working with just HTML, an easy way to tell the user where to input data and what to input, is with Buttons.
    To use Buttons, you need to give each input an ID. It is best practice to make the ID the data you are expecting to receive.
    Then, you create a <label> tag that references that ID using a ‘for’ attribute. This will look like this:
    <form>
    <label for ‘first-name’> First Name: </label>
    <input type = ‘text’ id = ‘first-name’>
    </form>        
    `;

    let task = `Add a submit button to the bottom of our form!`;

    let defaultAnswer = `
    <html>
        <head>
        </head>
        <body>
            <form>
                <label for = 'input1'>First Name:</label>
                <input id = 'input1'>
                <br>
                <label for = 'input2'>Last Name:</label>
                <input id = 'input2'>
                <!-- YOUR CODE HERE -->
            </form>
        </body>
    </html>
    `;

    let viewSolution = `
    <html>
        <head>
        </head>
        <body>
            <form>
                <label for = 'input1'>First Name:</label>
                <input id = 'input1'>
                <br>
                <label for = 'input2'>Last Name:</label>
                <input id = 'input2'>
                <input type = "submit" value = "Submit">
            </form>
        </body>
    </html>
    `;

    let hint = `Do you have a value on your submit button?`

    const isReady = async () => {
        if (answer === 'Correct') {
            await axios.post('/api/user/next-topic', { username: user.username, nextTopic: 8 });
            dispatch({ type: 'SET_ANSWER', payload: '' });
            history.push('/progression');
        } else {
            console.log('stay here')
        }
    }

    useEffect(() => {
        dispatch({ type: 'SET_CODE_BLOCK', payload: defaultAnswer });
    }, [dispatch]);

    return (
        <>
            <div className='topic'>
                <h1> Buttons </h1>
                <Lesson
                    defaultAnswer={defaultAnswer}
                    viewSolution={viewSolution}
                    lesson={lesson}
                    hint={hint}
                    task={task}
                    checkAnswer={checkAnswer}
                />
                <button onClick={() => {
                    // Stops user from backwards progression
                    history.push('/progression')
                }
                }
                > Back </button>
                <button onClick={() => {
                    isReady();
                }}>Next</button>
            </div >
        </>
    );
}

export default Buttons;