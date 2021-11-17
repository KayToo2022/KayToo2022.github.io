import Fade from "react-reveal";
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import "./styles.css"

function Header() {
    return(
        <div className="main">
            <Fade>
                <div className="linkcontainer">
                    
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
                        {/* <Link to="contact" className="links" smooth={true} duration={500} spy={true}>
                            Contact
                        </Link> */}
                        
                    
                    
                </div>
            </Fade>
        </div>
    )
}

export default Header;