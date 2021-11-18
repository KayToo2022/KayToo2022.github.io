import Fade from "react-reveal";
import ParticlesBg from "particles-bg";
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import "./styles.css"

function Landing() {
    return(
        <div id="landing" className="MainContent">
            
            <ParticlesBg type="circle" bg={true} style={{height:'100%'}}/>
            <Fade>
                <div className="landing" style={{height:'100vh'}}>
                    <p className="Title">Hi! My name is Kyle Tu</p>
                    <div className="message">
                        I am an aspiring software developer studying to get my 
                        Masters in Artificial Intelligence at San Jose State 
                        University.
                    </div>
                    <br/>
                    <Link className="message" to="about" smooth={true} duration={500} spy={true} >Click here to get started</Link>
                </div>
            </Fade>
        </div>    
    )
}

export default Landing;