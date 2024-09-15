import { useEffect, useState } from "react";
import Fade from "react-reveal";
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import "./styles.css"

function Header() {
    const [dropdown, toggleDropdown] = useState(false)
    
    return(
        <div className="main">
            <Fade>
                <div className="linkcontainer">
                        {(!dropdown) ? (
                            <div>
                                <Link to="landing" className="links" smooth={true} duration={500} spy={true}>
                                    Home
                                </Link>
                                <Link to="about" className="links" smooth={true} duration={500} spy={true}>
                                    About
                                </Link>
                                <Link to="resume" className="links" smooth={true} duration={500} spy={true}>
                                    Resume
                                </Link>
                                <Link to="portfolio" className="links" smooth={true} duration={500} spy={true}>
                                    Portfolio
                                </Link>
                                
                                <a style={{zIndex:"99"}} onClick={() => {toggleDropdown(true)}}>
                                    Other
                                </a>
                            </div>
                            
                        ) : (
                            <div>
                                <Fade>
                                    <div style={{display: "inline-block"}}>

                                        <a 
                                            className="links"
                                            onClick={() => {
                                                toggleDropdown(false)
                                            }}
                                        >
                                            Back
                                        </a>

                                        <a href='/#/cocktails' className="links">
                                            Cocktails
                                        </a>

                                        <a href='/#/wordle' className="links">
                                            Wordle
                                        </a>

                                    
                                    </div>
                                </Fade>
                                
                            </div>
                        )}
                        
                        {/* <a href='/#/cocktails' className="links">
                            Cocktails
                        </a> */}
                        {/* <Link to="contact" className="links" smooth={true} duration={500} spy={true}>
                            Contact
                        </Link> */}
                        
                    
                    
                </div>
            </Fade>
        </div>
    )
}

export default Header;