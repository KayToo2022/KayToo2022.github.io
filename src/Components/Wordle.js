import { useEffect, useState } from "react";
import axios from "axios";
import rs from "random-seed"
import words1 from "./files/shuffled_real_wordles.txt"
import words2 from "./files/combined_wordlist.txt"
import { Navigate, useParams } from "react-router";
import { useNavigate } from 'react-router-dom';


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function Wordle() {

    const [devTools, toggleDev] = useState(0);
    const [hardReset, toggleHardReset] = useState(0);

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [currentWord, setWord] = useState("");
    const [currentGuess, setGuess] = useState("");
    const [guessCount, setCount] = useState(0);
    const [guessHistory, setHistory] = useState([]);
    const [win, setWin] = useState(false);
    

    const [rightLetters, setRight] = useState([]);
    const [missedLetters, setMissed] = useState([]);
    const [wrongLetters, setWrong] = useState([]);

    const [winCount, setWinCount] = useState(0);
    const [winStreak, setWinStreak] = useState(0);

    const [wordBank, setWordBank] = useState([]);
    const [guessBank, setGuessBank] = useState([]);

    const [showWord, toggleShowWord] = useState(false);
    const [showIssue, toggleIssue] = useState(false);

    const [started, toggleStarted] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

    const [issue, setIssue] = useState("")

    const [seed, setSeed] = useState(0)

    const [copied, setCopied] = useState(false)

    var gen = require('random-seed')

    const [wordSeed, setWordSeed] = useState(0)
    const [tempSeed, submitSeed] = useState(0)
    const [parsedSeed, setParsedSeed] = useState(-1)

    const [chars, setChars] = useState({})

    const [charPressed, setCharPressed] = useState("")

    const kbTop = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    const kbMid = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
    const kbBot = ['z', 'x', 'c', 'v', 'b', 'n', 'm'] 

    var urlData = window.location.href

    const navigate = useNavigate()

    

    useEffect(() => {

        var urlSplit = urlData.split("wordle/")



        // if (!isNaN(parseInt(useParams().id))) {
        //     var seedData = parseInt(useParams().id)
        //     setParsedSeed(seedData)
        // }

        if (urlSplit.length > 1){
            var seedData = parseInt(urlSplit[1])
            setParsedSeed(seedData)
        }

        if (document.cookie
                .split(";")
                .some(item => item.trim().startsWith("k2wsr="))) {
                    var cookieData = document.cookie.split('; ').find(row => row.startsWith('k2wsr=')).split('=')[1].split(',')
                    setWinCount(parseInt(cookieData[0]))
                    setWinStreak(parseInt(cookieData[1]))
        } else {
            document.cookie= "k2wsr=0,0"
        }
        
        fetch(words1)
            .then(r => r.text())
            .then(text => {
                setWordBank(text.split('\n'))
            })

        fetch(words2)
            .then(r => r.text())
            .then(text => {
                setGuessBank(text.split('\n'))
            })
        
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        function handleUrlChange() {
            softReset()

            urlData = window.location.href
            var urlSplit = urlData.split("wordle/")


            if (urlSplit.length > 1) {
                setSeed(parseInt(urlSplit[1]))
            }

        }
        window.addEventListener(
            'hashchange',
            handleUrlChange,
            false
        );

        // use these to handle keypress without input field

        const onKeyDown = ({key}) => {

            setCharPressed(key)


        }

        const onKeyUp = ({key}) => {
            // no real use for this yet
        }

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);


        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);

            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
        }

        
    }, []);

    useEffect(() => {
        /* 
            since onKeyDown and onKeyUp cannot seem to see the variable but are still
            able to use the hook, handle hook function here

            resets the charPressed to a blank char since useeffect doesn't execute if
            no change is detected
        */
        if (charPressed != "") {
            // console.log(charPressed)

            toggleIssue(false)
            if (!started) {
                toggleStarted(true)
            }
            if (win || guessCount >=6) {
                resetGame()
            }
            if (currentGuess.length < 5 && charPressed != "Enter" && charPressed !="Backspace") {
                setGuess(currentGuess+charPressed)
            }
            if (charPressed == "Enter") {
                submitGuess(currentGuess.toLowerCase())
            }
            if (charPressed == "Backspace") {
                setGuess(currentGuess.substr(0,currentGuess.length -1 ))
            }
        }
        setCharPressed("")
    }, [charPressed])


    useEffect(() => {
        var temp = 0

        if (parsedSeed > -1) {
            temp = parsedSeed
            setParsedSeed(-1)
        } else {
            temp = Math.floor(Math.random() * 10000)
        }
        // var temp = Math.floor(Math.random() * 10000)
        
        setSeed(temp)

    }, [wordBank])

    useEffect(() => { 
        var randGen = gen(seed);
        setWordSeed(randGen.range(wordBank.length))
    }, [seed])

    useEffect(() => {
        generateWord()
    }, [wordSeed])

    useEffect(() => {
        if (winCount != 0) {
            document.cookie = `k2wsr=${winCount},${winStreak}`
        }
        
    }, [winCount, winStreak]) 

    useEffect(() => {
        if (started) {
            var st = Date.now()
            setStartTime(st)
        } else {
            var et = Date.now()
            setStartTime(et)
        }
        
    }, [started])

    useEffect(() => {
        if (endTime > startTime && win) {
            // console.log(endTime - startTime)
            setTotalTime(endTime-startTime)
        }
    }, [endTime])

    const charCount = (word) => {
        var ret = {}
        for (var i in word) {
            if (word[i] in ret) {
                ret[word[i]] += 1
            } else {
                ret[word[i]] = 1
            }
        }
        return ret
    }

    const generateWord = () => {
        var rand = wordSeed
        var word = wordBank[wordSeed]
        //var word = wordBank[Math.floor(Math.random() * wordBank.length)]
        setChars(charCount(word))
        setWord(word)
    }

    const softReset = () => {
        generateWord()
        setCount(0)
        setHistory([])
        setWin(false)
        setGuess("")
        setRight([])
        setWrong([])
        setMissed([])
        toggleShowWord(false)
        setCopied(false)
    }

    const resetGame = () => {
        
        navigate('/wordle')
        
        generateWord()
        setCount(0)
        setHistory([])
        setWin(false)
        setGuess("")
        setRight([])
        setWrong([])
        setMissed([])
        toggleShowWord(false)
        setCopied(false)
        if (seed.toString().length > 4) {
            setSeed(seed + 1)
        } else {
            setSeed(Math.floor(Math.random() * 10000))
        }
        // setSeed(Math.floor(Math.random() * 10000))
    }

    

    const submitGuess = (guess) => {
        if (!guess || guess.length != 5) {
            setIssue("Guess must be 5 letters")
            toggleIssue(true)
            // console.log("Guess must be 5 letters")
        } else if (guessBank.indexOf(guess) < 0){
            setIssue("Not a valid word")
            toggleIssue(true)
            // console.log("Not a word")
        } else {
            setCount(guessCount + 1)
            var ret = []
            var didWin = true;

            var greenLet = {}
            var yellowLet = {}

            // Pre-process (handles duplicates to the right)
            for (var i in guess) {
                var val = -1
                
                if (guess[i] == currentWord[i]) {
                    val = 1
                    // store that this letter is correct and should not have its color modified
                    if (guess[i] in greenLet) {
                        greenLet[guess[i]] += 1
                    } else {
                        greenLet[guess[i]] = 1
                    }
                } else if (currentWord.indexOf(guess[i]) >= 0) {
                    // color (val) should be modified if color already exists and multiple does not exist
                    
                    val = 0

                    // threshold checks

                    // green + yellow
                    if (guess[i] in greenLet && guess[i] in yellowLet) {
                        if (greenLet[guess[i]] + yellowLet[guess[i]] + 1 > chars[guess[i]]) {
                            val = -1

                        }
                    }

                    // just green (no other yellows)
                    if (guess[i] in greenLet) {

                        if (greenLet[guess[i]] + 1 > chars[guess[i]]) {
                            val = -1

                        }
                    }

                    // just yellow (no other greens)
                    if (guess[i] in yellowLet) {
                        if (yellowLet[guess[i]] + 1 > chars[guess[i]]) {
                            val = -1

                        }
                    }

                    // if not modified, it is a valid yellow
                    if (val == 0) {
                        if (guess[i] in yellowLet) {
                            yellowLet[guess[i]] += 1
                        } else {
                            yellowLet[guess[i]] = 1
                        }
                    }
                }

                if (val != 1) {
                    didWin = false
                }

                if (val == 1) {
                    var tempRight = rightLetters
                    tempRight.push(guess[i])
                    setRight(tempRight)
                }

                if (val == 0) {
                    var tempMissed = missedLetters
                    tempMissed.push(guess[i])
                    setMissed(tempMissed)
                }

                if (val == -1) {
                    var tempWrong = wrongLetters
                    tempWrong.push(guess[i])
                    setWrong(tempWrong)
                }
                ret.push([guess[i], val])
            }
            


            
            // tempChars is meant to be used like a yellowLet
            var tempChars = {}

            // Post process
            // go back to each yellow and see if it needs to be changed
            // test on seed 3896 epees (correct previous), penne (control), tepee (l to r)

            for (var i in ret) {
                // check only yellow chars
                if (ret[i][1] == 0) {
                    // track current char count for each character
                    if (ret[i][0] in tempChars) {
                        tempChars[ret[i][0]] += 1
                    } else {
                        tempChars[ret[i][0]] = 1
                    }


                    if (ret[i][0] in greenLet){
                        // check against green let and see if it breaks threshold

                        if (tempChars[ret[i][0]] + greenLet[ret[i][0]] > chars[ret[i][0]]) {
                            ret[i][1] = -1 
                        }
                        // yellow threshold is handled in the pre process of ret
                        // since the first valid yellow is allowed and handled accordingly, we don't need to handle it again

                    } 
                }
            }

            setWin(didWin)
            var tempHist = guessHistory
            tempHist.push(ret)
            setHistory(tempHist)
            setGuess("")
            if (didWin) {
                setWinCount(winCount + 1)
                setWinStreak(winStreak + 1)
                toggleStarted(false)
                setEndTime(Date.now())
                
                // resetGame()
            }
            if (!didWin && guessCount >= 5) {
                setWinStreak(0)
                toggleShowWord(true)
                toggleStarted(false)
                setEndTime(Date.now())
                
                // resetGame()
            }
            
        }
        return ret
    }

    const renderGuesses = () => {
        if (guessHistory.length == 0) {
            return []
        }

        const guesses = guessHistory.map((g) => (
            <div style={{width: "100%", marginBottom: "4.5px"}}>
                {renderGuess(g)}
            </div>
        ))

        // for (var i = 0; i < 6 - guesses.length; i++) {
        //     guesses.push(<div style={{height: "40px", width: "100%"}}/>)
        // }
        return guesses
    }

    const renderGuess = (i) => {
        const c = i.map((c) => (
            (c[1] == 0) ? (
                <div className="square" style={{backgroundColor: "#cdab4b", display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold", borderColor: "#cdab4b"}}>
                    <div className="content">
                        {c[0].toUpperCase()}
                    </div>    
                </div>
            ) : (
                (c[1] == 1) ? (
                    <div className="square"  style={{backgroundColor: "green", display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold", borderColor: "green"}}>
                        <div className="content">
                            {c[0].toUpperCase()}
                        </div>
                    </div>
                ) : (
                    (c[1] == -1) ? (
                        <div className="square"  style={{backgroundColor: "gray", display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}>
                            <div className="content">
                                {c[0].toUpperCase()}
                            </div>
                        </div>
                    ) : (<div>error</div>)
                )
            )   
        ))
        return (
            <div className="flexbox">
                {c}
            </div>
        )
    }

    const renderCurrent = () => {
        if (currentGuess == "") {
            // have this be a bar with character height
            return (
                <div>
                    <div className="square" style={{display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}>
                        <div className="content">
                            
                        </div>    
                    </div>
                    <div className="square" style={{display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}>
                        <div className="content">
                            
                        </div>    
                    </div>
                    <div className="square" style={{display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}>
                        <div className="content">
                            
                        </div>    
                    </div>
                    <div className="square" style={{display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}>
                        <div className="content">
                            
                        </div>    
                    </div>
                    <div className="square" style={{display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}>
                        <div className="content">
                            
                        </div>    
                    </div>
                </div>
            )
        }

        const r = currentGuess.split('').map((c) => (
            <div className="square" style={{display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}>
                        <div className="content">
                            {c[0].toUpperCase()}
                        </div>    
                    </div>

        ))

        var filler = 5 - r.length

        for (var i = 0; i < filler; i++) {
            r.push(
                <div className="square" style={{display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}>
                    <div className="content">
                        
                    </div>    
                </div>
            )
        }

        return (
            <div>
                {r}
            </div>
        )
    }

    const renderKeyBoard = () => {
        const t = kbTop.map((k) => (
            (rightLetters.indexOf(k) != -1) ? (
                <div 
                    className="wordleLetter"  
                    style={{backgroundColor: "green", display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold", borderColor: "green"}}
                    onClick={() => {
                        toggleIssue(false)
                        if (!started) {
                            toggleStarted(true)
                        }
                        toggleIssue(false)
                        if (win || guessCount >=6) {
                            resetGame()
                        }
                        if (currentGuess.length < 5) {
                            setGuess(currentGuess+k)
                        }
                    }}    
                >
                    {k.toUpperCase()}
                </div>
            ) : (
                (missedLetters.indexOf(k) != -1) ? (
                    <div 
                        className="wordleLetter"  
                        style={{backgroundColor: "#cdab4b", display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold", borderColor: "#cdab4b"}}
                        onClick={() => {
                            toggleIssue(false)
                            if (!started) {
                                toggleStarted(true)
                            }
                            if (win || guessCount >=6) {
                                resetGame()
                            }
                            if (currentGuess.length < 5) {
                                setGuess(currentGuess+k)
                            }
                        }}  
                    >
                        {k.toUpperCase()}
                    </div>
                ) : (
                    (wrongLetters.indexOf(k) != -1) ? (
                        <div 
                            className="wordleLetter"  
                            style={{backgroundColor: "black", display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}
                            onClick={() => {
                                toggleIssue(false)
                                if (!started) {
                                    toggleStarted(true)
                                }
                                if (win || guessCount >=6) {
                                    resetGame()
                                }
                                if (currentGuess.length < 5) {
                                    
                                    setGuess(currentGuess+k)
                                }
                            }}  
                        >
                            {k.toUpperCase()}
                        </div>
                    ) : (
                        <div 
                            className="wordleLetter"  
                            style={{backgroundColor: "gray", display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}
                            onClick={() => {
                                toggleIssue(false)
                                if (!started) {
                                    toggleStarted(true)
                                }
                                if (win || guessCount >=6) {
                                    resetGame()
                                }
                                if (currentGuess.length < 5) {
                                    
                                    setGuess(currentGuess+k)
                                }
                            }}  
                        >
                            {k.toUpperCase()}
                        </div>
                    )
                )
            )
        ))

        const m = kbMid.map((k) => (
            (rightLetters.indexOf(k) != -1) ? (
                <div 
                    className="wordleLetter"  
                    style={{backgroundColor: "green", display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold", borderColor: "green"}}
                    onClick={() => {
                        toggleIssue(false)
                        if (!started) {
                            toggleStarted(true)
                        }
                        if (win || guessCount >=6) {
                            resetGame()
                        }
                        if (currentGuess.length < 5) {
                            
                            setGuess(currentGuess+k)
                        }
                    }}    
                >
                    {k.toUpperCase()}
                </div>
            ) : (
                (missedLetters.indexOf(k) != -1) ? (
                    <div 
                        className="wordleLetter"  
                        style={{backgroundColor: "#cdab4b", display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold", borderColor: "#cdab4b"}}
                        onClick={() => {
                            toggleIssue(false)
                            if (!started) {
                                toggleStarted(true)
                            }
                            if (win || guessCount >=6) {
                                resetGame()
                            }
                            if (currentGuess.length < 5) {
                                
                                setGuess(currentGuess+k)
                            }
                        }}  
                    >
                        {k.toUpperCase()}
                    </div>
                ) : (
                    (wrongLetters.indexOf(k) != -1) ? (
                        <div 
                            className="wordleLetter"  
                            style={{backgroundColor: "black", display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}
                            onClick={() => {
                                toggleIssue(false)
                                if (!started) {
                                    toggleStarted(true)
                                }
                                if (win || guessCount >=6) {
                                    resetGame()
                                }
                                if (currentGuess.length < 5) {
                                    
                                    setGuess(currentGuess+k)
                                }
                            }}  
                        >
                            {k.toUpperCase()}
                        </div>
                    ) : (
                        <div 
                            className="wordleLetter"  
                            style={{backgroundColor: "gray", display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}
                            onClick={() => {
                                toggleIssue(false)
                                if (!started) {
                                    toggleStarted(true)
                                }
                                if (win || guessCount >=6) {
                                    resetGame()
                                }
                                if (currentGuess.length < 5) {
                                    
                                    setGuess(currentGuess+k)
                                }
                            }}  
                        >
                            {k.toUpperCase()}
                        </div>
                    )
                )
            )
        ))

        const b = kbBot.map((k) => (
            (rightLetters.indexOf(k) != -1) ? (
                <div 
                    className="wordleLetter"  
                    style={{backgroundColor: "green", display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold", borderColor: "green"}}
                    onClick={() => {
                        toggleIssue(false)
                        if (!started) {
                            toggleStarted(true)
                        }
                        if (win || guessCount >=6) {
                            resetGame()
                        }
                        if (currentGuess.length < 5) {
                            
                            setGuess(currentGuess+k)
                        }
                    }}    
                >
                    {k.toUpperCase()}
                </div>
            ) : (
                (missedLetters.indexOf(k) != -1) ? (
                    <div 
                        className="wordleLetter"  
                        style={{backgroundColor: "#cdab4b", display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold", borderColor: "#cdab4b"}}
                        onClick={() => {
                            toggleIssue(false)
                            if (!started) {
                                toggleStarted(true)
                            }
                            if (win || guessCount >=6) {
                                resetGame()
                            }
                            if (currentGuess.length < 5) {
                                
                                setGuess(currentGuess+k)
                            }
                        }}  
                    >
                        {k.toUpperCase()}
                    </div>
                ) : (
                    (wrongLetters.indexOf(k) != -1) ? (
                        <div 
                            className="wordleLetter"  
                            style={{backgroundColor: "black", display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}
                            onClick={() => {
                                toggleIssue(false)
                                if (!started) {
                                    toggleStarted(true)
                                }
                                if (win || guessCount >=6) {
                                    resetGame()
                                }
                                if (currentGuess.length < 5) {
                                    
                                    setGuess(currentGuess+k)
                                }
                            }}  
                        >
                            {k.toUpperCase()}
                        </div>
                    ) : (
                        <div 
                            className="wordleLetter"  
                            style={{backgroundColor: "gray", display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}
                            onClick={() => {
                                toggleIssue(false)
                                if (!started) {
                                    toggleStarted(true)
                                }
                                if (win || guessCount >=6) {
                                    resetGame()
                                }
                                if (currentGuess.length < 5) {
                                    
                                    setGuess(currentGuess+k)
                                }
                            }}  
                        >
                            {k.toUpperCase()}
                        </div>
                    )
                )
            )
        ))

        return (
            <div>
                <div className="flexbox">{t}</div>
                <div className="flexbox">{m}</div>
                {/* add the backspace and enter keys in bottom row */}
                <div className="flexbox">
                    <div 
                        className="wordleLetter"  
                        style={{backgroundColor: "gray", display: "inline-block", padding: "1px", margin: "1px", width: "auto"}}
                        onClick={() => {
                            toggleIssue(false)
                            if (guessCount <= 5 && win == false) {
                                // submitGuess(currentGuess.toLowerCase())
                                setGuess("")
                                
                            } else {
                                resetGame()
                            }
                        }}  
                    >
                        Clear
                    </div>
                    {b}
                    <div 
                        className="wordleLetter"  
                        style={{backgroundColor: "gray", display: "inline-block", padding: "1px", margin: "1px", width: "auto"}}
                        onClick={() => {
                            toggleIssue(false)
                            setGuess(currentGuess.substr(0,currentGuess.length -1 ))
                        }}  
                    >
                        Delete
                    </div>
                </div>
            </div>
        )
    }

    const renderWorkspace = () => {
        var guessesTaken = renderGuesses().length
        var rowsLeft = 5 - guessesTaken

        var rows = []

        for (var i = 0; i < rowsLeft; i++) {
            rows.push(
                <div>
                    <div className="square" style={{display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}>
                        <div className="content">
                            
                        </div>    
                    </div>
                    <div className="square" style={{display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}>
                        <div className="content">
                            
                        </div>    
                    </div>
                    <div className="square" style={{display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}>
                        <div className="content">
                            
                        </div>    
                    </div>
                    <div className="square" style={{display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}>
                        <div className="content">
                            
                        </div>    
                    </div>
                    <div className="square" style={{display: "inline-block", padding: "1px", margin: "1px", fontWeight: "bold"}}>
                        <div className="content">
                            
                        </div>    
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div>
                    {renderGuesses()}
                </div>
                {/* <div style={{display: "block", width: "100%", height: "3px"}}/> */}
                {(guessCount < 6) ? (
                    <div>
                        {renderCurrent()}
                    </div>
                ) : (
                    null
                )}
                
                <div>
                    {rows}
                </div>
            </div>
        )
    }

    const copyGrid = () => {
        var tempText = ""

        for (var i in guessHistory) {

            for (var j in guessHistory[i]) {

                if (guessHistory[i][j][1] == 0) {
                    tempText += "🟨"
                }
                if (guessHistory[i][j][1] == 1) {
                    tempText += "🟩"
                }
                if (guessHistory[i][j][1] == -1) {
                    tempText += "⬛️"
                }
            }

            tempText += '\n'
        }

        return tempText
    }



    return (
        <div className="testLanding" style={{height: "auto"}}
            // be able to submit while not in text entry


        >
            <div style={{width: "100%", maxWidth: "750px"}}>
                {(devTools == 3) ? (
                    <div  
                        onClick={() => {
                            toggleHardReset(hardReset + 1)
                            if (hardReset == 2) {
                                document.cookie= "k2wsr=0,0"
                                setWinCount(parseInt(0))
                                setWinStreak(parseInt(0))
                                toggleHardReset(0)
                            }
                        }} 
                        style={{position: "absolute", backgroundColor: "red", top: "0px", right: "0px"}}
                    >
                        w: {windowDimensions.width}, h: {windowDimensions.height}
                    </div>
                    
                ) : (
                    null
                )}

                {(devTools == 3) ? (
                    <div style={{position: "absolute", top: "0px", left: "0px"}}>
                    <input
                        
                        onChange={(e) => {
                            if (!isNaN(e.target.value)) {
                                submitSeed(parseInt(e.target.value))
                            } else {
                                // console.log("invalid")
                            }
                        }}
                    />
                    <button
                        onClick={() => {
                            setSeed(tempSeed)
                            toggleDev(0)
                            submitSeed(0)
                        }}
                    >Set Seed</button>
                    {/* <button
                        onClick={() => {

                        }}
                    >Test</button> */}
                    </div>
                ) : (
                    null
                )}

                {(windowDimensions.width > 800) ? (
                    <div style={{width: '100%'}}>
                        <div style={{display: "inline-block", width: "60%", marginLeft: "20%", fontWeight: 'bold', fontSize: "48px"}}>
                            Wordle Sim
                        </div>
                        
                        <div style={{display: "inline-block", fontSize: "24px", width: "20%", textAlign: "left", justifyContent:'left'}}>
                            <div>
                                Wins: {winCount}
                            </div>
                            <div>
                                Winstreak: {winStreak}
                            </div>
                        </div>
                    </div>  
                ) : (
                    <div style={{width: '100%'}}>
                        <div style={{display: "inline-block", width: "48%", marginLeft: "26%", fontWeight: 'bold', fontSize: "30px"}}>
                            Wordle Sim
                        </div>
                        
                        <div style={{display: "inline-block", fontSize: "15px", width: "26%", textAlign: "left", justifyContent:'left'}}>
                            <div>
                                Wins: {winCount}
                            </div>
                            <div>
                                Winstreak: {winStreak}
                            </div>
                        </div>
                    </div> 
                )}

                

                {/* Wordle sim
                <br/> */}

                
                

                <br/>

                <div>
                    {renderWorkspace()}
                </div>
                
                {(win && seed.toString().length < 5) ? (
                    <div>
                        <div>
                            {(totalTime)/1000}s, Seed: {seed}
                        </div>
                        <div className="links" onClick={() => {
                                    // navigator.clipboard.writeText(`Solved this wordle-like game in ${(totalTime)/1000} seconds. See if you can do better\n${urlData.split("wordle")[0]}wordle/${seed}`)
                                    navigator.clipboard.writeText(`Guesses: ${guessHistory.length}/6\nTime: ${((totalTime)/1000).toFixed(2)} s\n${copyGrid()}\n${urlData.split("wordle")[0]}wordle/${seed}`)
                                    setCopied(true)
                                }   
                            }>
                            {(copied) ? (
                                "Copied"
                            ) : (
                                "Copy to Clipboard"
                            )}
                            
                        </div>
                    </div>
                ) : (
                    ((showWord || devTools == 3) && seed.toString().length < 5) ? (
                        <div>
                            <div>
                                Word: {currentWord} Seed: {seed}
                            </div>
                            <div className="links" onClick={() => {
                                        // navigator.clipboard.writeText(`This word is a tough one. See if you can solve it\n${urlData.split("wordle")[0]}wordle/${seed}`)
                                        navigator.clipboard.writeText(`Guesses: X/6\nTime: N/A\n${copyGrid()}\n${urlData.split("wordle")[0]}wordle/${seed}`)
                                        setCopied(true)
                                    }
                                }>
                                {(copied) ? (
                                    "Copied"
                                ) : (
                                    "Copy to Clipboard"
                                )}
                            </div>
                        </div>
                    ) : (
                        (showIssue && seed.toString().length < 5) ? (
                            <div>{issue}</div>
                        ) : (
                            null
                            )
                        )
                )}

                {(win && seed.toString().length >= 5) ? (
                    <div>
                        {(totalTime)/1000}s
                    </div>
                ) : (
                    ((showWord || devTools == 3) && seed.toString().length >= 5) ? (
                        <div>{currentWord}</div>
                    ) : (
                        (showIssue && seed.toString().length >= 5) ? (
                            <div>{issue}</div>
                        ) : (
                            null
                            )
                        )
                )}

                <br/>
                <div className="flexbox">

                
                {
                // old input box, might still need it

                /* <input
                    className="ctButton"
                    style={{marginLeft: "5%", marginRight: "5%",marginTop:"0", float: "left", border: "none", backgroundColor: "white", color: "black", padding: "12px", width: "30%", justifyContent: "center"}}
                    
                    value={currentGuess}
                    onChange={(e)=>{
                        toggleIssue(false)
                        if (!started) {
                            toggleStarted(true)
                        }
                        if (win || guessCount >=6) {
                            resetGame()
                        }

                        var temp = e.target.value.substr(0,5)


                        setGuess(temp)

                    }}
                    // attempting to have keyboard functionality without text input box
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            if (win || guessCount >=6) {
                                resetGame()
                            }
                            submitGuess(currentGuess.toLowerCase())
                        }
                    }}
                /> */}
            
                {(win) ? (
                    <button 
                        onClick={() => {
                            resetGame()
                        }}
                        className="wordleButton"
                        style={{padding: "11px", width: "100%"}}
                    >
                        Continue
                    </button>
                ) : (
                    <div style={{display: "inline", width: "100%"}}>
                        <button 
                            className="wordleButton"
                            style={{padding: "11px", width: "40%", marginRight: "5%"}}
                            onClick={() => {
                                if (guessCount <= 5 && win == false) {
                                    submitGuess(currentGuess.toLowerCase())
                                    
                                } else {
                                    resetGame()
                                }
                            
                        }}>
                            Submit
                        </button>
                        <button 
                            onClick={() => {
                                if (guessCount == 0){
                                    if (devTools == 3) {
                                        toggleDev(0)
                                    } else {
                                        toggleDev(devTools + 1)
                                    }
                                } else {
                                    toggleDev(0)
                                }
                                resetGame()
                                toggleStarted(false)
                                if (!win) {
                                    setWinStreak(0)
                                    if (guessCount <= 5) {
                                        setSeed(Math.floor(Math.random() * 10000))
                                    }
                                }

                                
                            }}
                            className="wordleReset"
                            style={{padding: "11px", width: "40%"}}
                        >
                            Reset
                        </button>
                    </div>
                )}
                
                </div>

                <br/>
                <div>
                    {renderKeyBoard()}
                </div>
                <br/>
                <div>
                    <a href='/' className="wordleButton">Return to the main page</a>
                </div>

                <br/>
            </div>
        </div>
    )
}

export default Wordle;