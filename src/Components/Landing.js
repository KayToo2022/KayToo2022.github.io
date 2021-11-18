import {React, useEffect, useState}from "react";
import Fade from "react-reveal";
import ParticlesBg from "particles-bg";
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import "./styles.css"

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

function Landing() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
        setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const banner = () => {
        if (windowDimensions.width > 750) {
            return (
                <div className="message" style={{height:'auto'}}>
                        I am an aspiring software developer studying to get my 
                        Masters in Artificial Intelligence at San Jose State 
                        University.
                </div>
            )
        }
        return (<div/>)
    }

    return(
        <div id="landing" className="MainContent">
            
            <ParticlesBg type="circle" bg={true} style={{height:'100vh'}}/>
            <Fade>
                <div className="landing" style={{height:'auto'}}>
                    <p className="Title" style={{height:'auto'}}>Hi! My name is Kyle Tu</p>
                    {/* <div className="message" style={{height:'auto'}}>
                        I am an aspiring software developer studying to get my 
                        Masters in Artificial Intelligence at San Jose State 
                        University.
                    </div> */}
                    {banner()}
                    <br/>
                    <Link className="message" to="about" smooth={true} duration={500} spy={true}  style={{height:'auto'}}>Click here to get started</Link>
                </div>
            </Fade>
        </div>    
    )
}

export default Landing;