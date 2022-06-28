import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lesson from '../../Lesson/Lesson';
import Quiz from '../../Quiz/QuizPageOne';

function HeaderAndParagraph() {
    const user = useSelector((store) => store.user);
    const answer = useSelector((store) => store.answer);
    const history = useHistory()
    const dispatch = useDispatch();

    const checkAnswer = (codeBlock) => {

        const parser = new DOMParser();
        const parsed = parser.parseFromString(codeBlock, "text/html");
        let parsedExpanded = parsed.lastChild.lastChild.childNodes;
        console.log('parsed', parsed.lastChild.lastChild)
        console.log('parse expanded:', parsedExpanded.length)

        // Determines whether or not codeBlock is correct.
        // This will need to be modified for every different topic.

        try {
            if (parsedExpanded.length < 5) {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
            if (parsedExpanded[1].nodeName === 'H1' && parsedExpanded[3].nodeName === 'P') {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            } else {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
        } catch {
            dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
        }
    }

    let lesson = `
    Header and paragraph tags are a very common way to display text on a webpage.
    A paragraph tag looks like this <p> Paragraph!  </p> and is used for displaying blocks of text.
    A header tag looks like this <h1> Header! </h1>. Header tags are used to title blocks of text. There are six sizes of header tags, which can be used to communicate that some information is more important than other information. In code it looks like this: <h1> Header One </h1> <h2> Header Two </h2> <h3> Header Three </h3> <h4> Header Four </h4> <h5> Header Five </h5> <h6> Header Six </h6>
    `;

    let task = `Create a <h1> tag with your name and a <p> tag below it that says “Hello World!”!`;

    let defaultAnswer = `
    <html>
        <head>
        </head>
        <body>
            <!-- YOUR CODE HERE -->
        </body>
    </html>
    `;

    let viewSolution = `
    <html>
        <head>
        </head>
        <body>
                <h1> ${user.name} </h1>
                <p> Hello World! </p>
        </body>
    </html>
    `;

    let hint = `Are your <h1> and <p> tags inside <body>?`

    let quizOptions = {
        topic: 'elements_results',
        router: 'elements',
        nextTopic: 2,
        // First Question
        question1: 'What is the <h1> tag used for?',
        o1: {question: 'Create unimportant information', value: 0},
        o2: {question: 'Create paragraphs on a page', value: 0},
        o3: {question: 'Create a web page title', value: 1},
        o4: {question: 'Page styling', value: 0},
        // Second Question
        question2: 'Which of the following uses correct opening and closing tags?',
        o5: {question: '<h1> Content </h1>', value: 1},
        o6: {question: '<h1> Content <h1>', value: 0},
        o7: {question: '</h1> Content </h1>', value: 0},
        o8: {question: '</h1> Content <h1> ', value: 0},
        // Third Question
        question3: 'How many heading elements are there?',
        o9: {question: 'Three', value: 0},
        o10: {question: 'One', value: 0},
        o11: {question: 'As many as you want', value: 0},
        o12: {question: 'Six', value: 1},
        // Fourth Question
        question4: 'What typically goes between opening and closing tags?',
        o13: {question: 'Nothing', value: 0},
        o14: {question: 'Styling', value: 0},
        o15: {question: 'Text or other tags', value: 1},
        o16: {question: 'JavaScript', value: 0},
        // Fifth Question
        question5: 'What is this tag used for? <p>',
        o17: {question: 'Page styling', value: 0},
        o18: {question: 'Create the most important information', value: 0},
        o19: {question: 'Create a web page title', value: 0},
        o20: {question: 'Create paragraphs on a page', value: 1},
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

    useEffect(() => {
        dispatch({ type: 'SET_CODE_BLOCK', payload: defaultAnswer });
    }, [dispatch]);

    return (
        <>
            <div className='topic'>
                <h1>Header and Paragraph</h1>
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
                    // user.recent_topic_completed > 2 ? '' : axios.post('/api/user/next-topic', { username: user.username, nextTopic: 2 })
                    isReady();
                }}>Next</button>
            </div >
        </>
    );
}

export default HeaderAndParagraph;