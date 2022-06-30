import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CB_Default from '../CodeBuddy Graphics/CB_Default.svg';
import CB_Blink from '../CodeBuddy Graphics/CB_Blink.svg';
import CB_Annoyed from '../CodeBuddy Graphics/CB_Annoyed.svg';
import CB_Tongue from '../CodeBuddy Graphics/CB_Tongue.svg';
import CB_Evil from '../CodeBuddy Graphics/CB_Evil.svg';
import CB_Human from '../CodeBuddy Graphics/CB_Human.png';
import Circuit from '../CodeBuddy Graphics/Curcuit.svg'
import Container from '@material-ui/core/Container';
import Grid from '@mui/material/Grid'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Lesson(props) {

    const dispatch = useDispatch();

    // Local state used only to toggle hint

    const [toggle, setToggle] = useState('hide-hint');
    const [toggleSubmit, setToggleSubmit] = useState('show');
    const [annoyed, setAnnoyed] = useState(false);
    const [cbStatus, setCbStatus] = useState(CB_Default);
    const [clicks, setClicks] = useState(0);

    // Supports tabbing inside code block

    var textareas = document.getElementsByTagName('textarea');
    var count = textareas.length;
    for (var i = 0; i < count; i++) {
        textareas[i].onkeydown = function (e) {
            if (e.keyCode == 9 || e.which == 9) {
                e.preventDefault();
                var s = this.selectionStart;
                this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
                this.selectionEnd = s + 1;
            }
        }
    }

    // Reducers

    const codeBlock = useSelector((store) => store.codeBlock);
    const answer = useSelector((store) => store.answer);

    // All data that needs to be brought in through the
    // topic components

    let defaultAnswer = props.defaultAnswer;
    let viewSolution = props.viewSolution;
    let lesson = props.lesson;
    let hint = props.hint;
    let task = props.task;
    let checkAnswer = props.checkAnswer;

    // Gets called when code buddy is clicked on

    const annoyCB = () => {
        if (clicks < 10) {
            setTimeout(
                () => {
                    setAnnoyed(true)
                },
                0
            );
            setTimeout(
                () => setAnnoyed(false),
                700
            );
        }
    }

    // Tracks clicks on CB

    const coolCB = () => {
        if (clicks >= 10) {
            setCbStatus(CB_Evil);
        }
        if (clicks >= 100) {
            setCbStatus(CB_Human);
        }
        console.log(clicks)
    }


    // Constantly runs when page is loaded - makes code buddy blink - or stick his tongue out

    const blinkCB = () => {
        setInterval(
            () => {
                setTimeout(
                    () => {
                        setCbStatus(CB_Blink)
                    },
                    0
                );
                setTimeout(
                    () => setCbStatus(CB_Default),
                    300
                )
            },
            5000
        );
    }

    const tongueCB = () => {
        setInterval(
            () => {
                setTimeout(
                    () => {
                        setCbStatus(CB_Tongue)
                    },
                    0
                );
                setTimeout(
                    () => setCbStatus(CB_Default),
                    1500
                )
            },
            random(20000, 80000)
        );
    }

    function random(min, max) {
        let difference = max - min;
        let rand = Math.random();
        rand = Math.floor(rand * difference);
        rand = rand + min;
        console.log('tongue in ', rand / 1000, 'seconds')
        return rand;
    }

    // useEffect will fetch most up to date answer and code block on load

    useEffect(() => {
        dispatch({ type: 'GET_CODE_BLOCK' });
        dispatch({ type: 'SET_ANSWER', payload: '' });
        blinkCB();
        tongueCB();
    }, [dispatch]);

    return (
        <Grid
            container
            direction={{ xs: "column", sm: "column", md: "row" }}
            // sx={{ flexDirection: { xs: "column", md: "row" } }}
            spacing={0}
            columns={{ xs: 4, sm: 12, md: 12 }}
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs='auto' md={3}>
                <Item>
                    <img src={Circuit} className='curcuit' />
                    <div className="lesson">
                        <p>{lesson}</p>
                    </div>
                </Item>
            </Grid>
            <Grid item xs='auto' md={5}>
                <Item>
                    <div className="code">
                        <div className='task-and-cb'>
                            <img className='code-buddy' onClick={() => {
                                annoyCB();
                                setClicks(clicks + 1);
                                coolCB();
                            }} src={annoyed ? CB_Annoyed : cbStatus}></img>
                            <h2 className="task">{task}</h2>
                        </div>
                        <h1 className='answer'>{answer ? answer + '!' : ''}</h1>
                        <textarea value={codeBlock} onChange={(e) => {
                            dispatch({ type: 'SET_CODE_BLOCK', payload: e.target.value });
                        }}></textarea>
                        <h3 className={toggle}>{hint}</h3>
                        <div className="pageButtons">
                            <button onClick={() => toggle ? setToggle('') : setToggle('hide-hint')}>Hint</button>
                            {toggleSubmit ? <button onClick={() => {
                                if (!toggleSubmit) {
                                    setToggleSubmit('show');
                                } else {
                                    setToggleSubmit('');
                                }
                                dispatch({ type: 'SET_CODE_BLOCK', payload: viewSolution })
                            }
                            }>View Solution</button> : ''}
                            <button onClick={() => {
                                dispatch({ type: 'SET_CODE_BLOCK', payload: defaultAnswer })
                                dispatch({ type: 'SET_ANSWER', payload: '' });
                                setToggleSubmit('show');
                            }
                            }>Reset</button>
                            {toggleSubmit ? <button onClick={() => checkAnswer(codeBlock)}>Submit</button> : ''}
                        </div>
                    </div>
                </Item>
            </Grid>
            <Grid item xs='auto' md={3}>
                <Item>
                    <div className="preview">
                        <h1>Preview</h1>
                        <iframe srcDoc={codeBlock}></iframe>
                    </div>
                </Item>
            </Grid>
        </Grid>
    )
}

export default Lesson;