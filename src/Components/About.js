import {React, useEffect, useState}from "react";
import Fade from "react-reveal";
import {
    HideBetween,
    HideDuring,
    HideOn,
    HideScroll,
  } from "react-hide-on-scroll";

import Logo from "./Images/Logo.jpg"

import "./styles.css"

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

function About() {

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
        setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if(windowDimensions.width <= 700) {
        return(
            <div id="about" className="MainContent">
                <div className="navPadding"/>
                {/* <HideBetween startDivID="landing" endDivID="resume" inverse> */}
                    <Fade>
                        <div className="gridWrapper">
                            {/* <div className="gridBoxL" style={{textAlign:'center'}}>
                                <img src={Logo} style = {{height: '120px', width: '120px', borderRadius:'50%', marginTop: '40px'}}></img>
                            </div> */}
                            <div className="gridBoxMobile">
                                <h1>About Me</h1>

                                <p className="message" style={{width:'100%'}}>
                                    My name is Kyle Tu. I am an aspiring software developer studying to get my 
                                    Masters in Artificial Intelligence at San Jose State 
                                    University. I mainly use React to code webpages but I 
                                    have experience coding in Java, Python, C++, etc.
                                </p>

                                <p className="message" style={{width:'100%'}}>
                                    Earning my Major in Applied Mathematics and Minor in Computer
                                    Science, I know my way around numbers and algorithms. Through 
                                    obtaining my Masters in Artificial Intelligence, I hope to sharpen
                                    my software engineering skills and grow as a developer.
                                </p>

                                {/* <div className="gridWrapper">
                                    

                                </div> */}
                            </div>
                            <div className="gridBoxMobile">
                                <h1>Contact Details:</h1>
                                <h1 className="contactInfo">kaytoo2022@gmail.com</h1>
                                <h1 className="contactInfo">510-612-3222</h1>
                            </div>
                                {/* <div className="gridCol6_11">
                                <h1 className="contactInfo">kaytoo2022@gmail.com</h1>
                                <h1 className="contactInfo">(510)612-3222</h1>
                                </div> */}

                            <div className="gridBoxMobile">
                                <h1>Resume:</h1>
                                <a href="https://drive.google.com/file/d/1LrkhlJ_QOVjraYpZ6QjBPVsqhWaDDnlZ/view?usp=sharing" target="_blank" className="downloadButton">
                                    Download
                                </a>
                            </div>
                        </div>
                        
                    </Fade>
                {/* </HideBetween> */}
                <div className="navPadding"/>            
            </div> 
        )
    }

    return(
        <div id="about" className="MainContent" style={{minHeight: '50vh'}}>
            <div className="navPadding"/>
            {/* <HideBetween startDivID="landing" endDivID="resume" inverse> */}
                <Fade>
                    <div className="gridWrapper">
                        <div className="gridBoxL" style={{textAlign:'center'}}>
                            <a href='/#/test'>
                            <img src={Logo} style = {{height: '120px', width: '120px', borderRadius:'50%', marginTop: '40px'}}>
                                
                            </img>
                            </a>
                        </div>
                        <div className="gridBoxR">
                            <h1>About Me</h1>

                            <p className="message" style={{width:'100%'}}>
                                My name is Kyle Tu. I am an aspiring software developer studying to get my 
                                Masters in Artificial Intelligence at San Jose State 
                                University. I mainly use React to code webpages but I 
                                have experience coding in Java, Python, C++, etc.
                            </p>

                            <p className="message" style={{width:'100%'}}>
                                Earning my Major in Applied Mathematics and Minor in Computer
                                Science, I know my way around numbers and algorithms. Through 
                                obtaining my Masters in Artificial Intelligence, I hope to sharpen
                                my software engineering skills and grow as a developer.
                            </p>

                            <div className="gridWrapper">
                                <div className="gridCol1_6">
                                   <h1>Contact Details:</h1>
                                   <h1 className="contactInfo">kaytoo2022@gmail.com</h1>
                                   <h1 className="contactInfo">510-612-3222</h1>
                                </div>


                                <div className="gridCol11_16">
                                   <h1>Resume:</h1>
                                   <a href="https://drive.google.com/file/d/1c5YFJRKJHAafLt2EpfLDcAuL2-vfL2GW/view?usp=sharing" target="_blank" className="downloadButton">
                                       Download
                                   </a>
                                </div>

                            </div>
                        </div>
                        
                    </div>
                    
                </Fade>
            {/* </HideBetween> */}
            <div className="navPadding"/>            
        </div> 
    )
}

export default About;