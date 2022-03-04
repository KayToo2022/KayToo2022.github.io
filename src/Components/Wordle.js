import { useEffect, useState } from "react";
import axios from "axios";
import words1 from "./files/shuffled_real_wordles.txt"
import words2 from "./files/combined_wordlist.txt"


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

    const [issue, setIssue] = useState("")

    const kbTop = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    const kbMid = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
    const kbBot = ['z', 'x', 'c', 'v', 'b', 'n', 'm']

    var wordList = ["tower", "water", "actor", "agent"]

    useEffect(() => {

        if (document.cookie
                .split(";")
                .some(item => item.trim().startsWith("k2wsr="))) {
                    console.log(document.cookie.split('; ').find(row => row.startsWith('k2wsr=')))
                    var cookieData = document.cookie.split('; ').find(row => row.startsWith('k2wsr=')).split('=')[1].split(',')
                    console.log(cookieData)
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

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        generateWord()
    }, [wordBank])

    useEffect(() => {
        if (winCount != 0) {
            document.cookie = `k2wsr=${winCount},${winStreak}`
        }
        
    }, [winCount, winStreak])

    

    const generateWord = () => {
        // for now get word from wordlist
        var rand = Math.floor(Math.random() * wordBank.length)
        // console.log(rand)
        var word = wordBank[Math.floor(Math.random() * wordBank.length)]
        // console.log(word)
        setWord(word)
    }

    const resetGame = () => {
        


        generateWord()
        setCount(0)
        setHistory([])
        setWin(false)
        setGuess("")
        setRight([])
        setWrong([])
        setMissed([])
        toggleShowWord(false)
    }

    const submitGuess = (guess) => {
        if (!guess || guess.length != 5) {
            setIssue("Guess must be 5 letters")
            toggleIssue(true)
            console.log("Guess must be 5 letters")
        } else if (guessBank.indexOf(guess) < 0){
            setIssue("Not a valid word")
            toggleIssue(true)
            console.log("Not a word")
        } else {
            setCount(guessCount + 1)
            var ret = []
            var didWin = true;

            for (var i in guess) {
                var val = -1
                
                if (guess[i] == currentWord[i]) {
                    val = 1
                } else if (currentWord.indexOf(guess[i]) >= 0) {
                    val = 0
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
            

            

            setWin(didWin)
            var tempHist = guessHistory
            tempHist.push(ret)
            setHistory(tempHist)
            setGuess("")
            if (didWin) {
                setWinCount(winCount + 1)
                setWinStreak(winStreak + 1)
                // resetGame()
            }
            if (!didWin && guessCount >= 5) {
                setWinStreak(0)
                toggleShowWord(true)
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
            <div style={{width: "100%", marginBottom: "2px"}}>
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
                                submitGuess(currentGuess.toLowerCase())
                                
                            } else {
                                resetGame()
                            }
                        }}  
                    >
                        Enter
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

    return (
        <div className="testLanding" style={{height: "auto"}}>
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

                {/* Wordle sim
                <br/> */}

                
                <div>
                    Wins: {winCount}, Winstreak: {winStreak}
                </div>

                <br/>

                <div>
                    {renderWorkspace()}
                </div>
                {(showWord) ? (
                    <div>{currentWord}</div>
                ) : (null)}
                {(showIssue) ? (
                    <div>{issue}</div>
                ) : (null)}
                {(devTools == 3) ? (
                    <div>
                        {currentWord}
                    </div>
                ) : (
                    null
                )}
                <br/>
                <div className="flexbox">
                <input
                    className="ctButton"
                    style={{marginLeft: "5%", marginRight: "5%",marginTop:"0", float: "left", border: "none", backgroundColor: "white", color: "black", padding: "12px", width: "30%", justifyContent: "center"}}
                    
                    value={currentGuess}
                    onChange={(e)=>{
                        toggleIssue(false)
                        if (win || guessCount >=6) {
                            resetGame()
                        }

                        var temp = e.target.value.substr(0,5)


                        setGuess(temp)

                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            if (win || guessCount >=6) {
                                resetGame()
                            }
                            submitGuess(currentGuess.toLowerCase())
                        }
                    }}
                />
            
                {(win) ? (
                    <button 
                        onClick={() => {
                            resetGame()
                        }}
                        className="wordleButton"
                        style={{padding: "11px", marginRight: "5%", width: "60%"}}
                    >
                        Continue
                    </button>
                ) : (
                    <div style={{display: "inline", marginRight: "5%", width: "60%"}}>
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
                                console.log(devTools)
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
                                if (!win) {
                                    setWinStreak(0)
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