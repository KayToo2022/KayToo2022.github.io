import {React, useEffect, useState}from "react";
import Fade from "react-reveal";
import ParticlesBg from "particles-bg";
import { Link } from 'react-scroll'

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
        if (windowDimensions.width > 900) {
            return (
                <div className="message" style={{height:'auto'}}>
                    I am a front-end developer at Adobe working in e-commerce with a Masters in Artificial Intelligence.
                </div>
            )
        }
        return (<div/>)
    }

    return(
        <div id="landing" className="MainContent">
            {(windowDimensions.width > 900) ? (
                 <ParticlesBg type="cobweb" color="#0055A2" bg={{position: "absolute", zIndex: -1, top: 0, left: 0, backgroundColor: "#282c34"}} style={{height:'100vh'}} num={420}/>
            ) : (
                <ParticlesBg type="cobweb" color="#0055A2" bg={{position: "absolute", zIndex: -1, top: 0, left: 0, backgroundColor: "#282c34"}} style={{height:'100vh'}} num={100}/>
            )}

            <Fade>
                <div className="landing" style={{height:'auto'}}>
                    <p className="Title" style={{height:'auto'}}>Hi! My name is Kyle Tu</p>
                    {banner()}
                    <br/>
                    <Link className="message" to="about" smooth={true} duration={500} spy={true}  style={{height:'auto'}}>Click here to get started</Link>
                </div>
            </Fade>
        </div>    
    )
}

export default Landing;