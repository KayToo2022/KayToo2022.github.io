import {React, useEffect, useState}from "react";
import Fade from "react-reveal";
import {
    HideBetween,
    HideDuring,
    HideOn,
    HideScroll,
  } from "react-hide-on-scroll";

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
function Resume() {

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
            <div id="resume" className="MainContent" style={{backgroundColor:"white", color: 'black'}}>
            <div className="navPadding"/>
            <HideBetween startDivID="about" endDivID="portfolio" inverse>
                <Fade>
                    <div className="gridWrapper">
                        <div className="gridBoxMobile">
                            <div className="resumeTitle underlined">
                                <h1>Education</h1>
                            </div>    
                        </div>
                        <div className="gridBoxMobile">
                            <h1 className="major">Masters in Artificial Intelligence</h1>
                            <p className="info">San Jose State University • May 2024</p>

                            <h1 className="major">Bachelors in Applied Mathematics</h1>
                            <p className="minor">Minor in Computer Science</p>
                            <p className="info">San Jose State University • May 2021</p>
                        </div>
                        <div className="gridBoxMobile">
                            <div className="resumeTitle underlined">
                                <h1>Experience</h1>
                            </div>
                        </div>
                        <div className="gridBoxMobile">
                            <h1 className="major">Adobe</h1>
                            <p className="minor">Software Engineering Intern, eCommerce Experiences</p>
                            <p className="info">May 2022 - August 2022</p>
                            {/* <br/> */}
                            <h1 className="major">Infinite Options</h1>
                            <p className="minor">Front-End Development Intern</p>
                            <p className="info">May 2021 - August 2021</p>
                        </div>
                        <div className="gridBoxMobile">
                            <div className="resumeTitle underlined">
                                <h1>Organizations</h1>
                            </div>    
                        </div>
                        <div className="gridBoxMobile">
                            <h1 className="major">Hong Kong Students Association</h1>
                            <p className="info">Treasurer</p>
                            <p className="info">August 2019 - May 2021</p>
                        </div>
                    </div>
                </Fade>
            </HideBetween>
            <div className="navPadding"/>
        </div>    
        )
    }

    return(
        <div id="resume" className="MainContent" style={{backgroundColor:"white", color: 'black'}}>
            <div className="navPadding"/>
            <HideBetween startDivID="about" endDivID="portfolio" inverse>
                <Fade>
                    <div className="gridWrapper">
                        <div className="gridBoxL">
                            <div className="resumeTitle underlined">
                                <h1>Education</h1>
                            </div>    
                        </div>
                        <div className="gridBoxR">
                            <h1 className="major">Masters in Artificial Intelligence</h1>
                            <p className="info">San Jose State University • May 2024</p>

                            <h1 className="major">Bachelors in Applied Mathematics</h1>
                            <p className="minor">Minor in Computer Science</p>
                            <p className="info">San Jose State University • May 2021</p>
                        </div>
                        <div className="gridBoxL">
                            <div className="resumeTitle underlined">
                                <h1>Experience</h1>
                            </div>
                        </div>
                        <div className="gridBoxR">
                            <h1 className="major">Adobe Inc.</h1>
                            <p className="minor">Software Engineering Intern, eCommerce Experiences</p>
                            <p className="info">May 2022 - August 2022</p>
                            {/* <br/> */}
                            <h1 className="major">Infinite Options LLC</h1>
                            <p className="minor">Front-End Development Intern</p>
                            <p className="info">May 2021 - August 2021</p>
                        </div>
                        <div className="gridBoxL">
                            <div className="resumeTitle underlined">
                                <h1>Organizations</h1>
                            </div>    
                        </div>
                        <div className="gridBoxR">
                            <h1 className="major">Hong Kong Students Association</h1>
                            <p className="info">Treasurer</p>
                            <p className="info">August 2019 - May 2021</p>
                        </div>
                    </div>
                </Fade>
            </HideBetween>
            <div className="navPadding"/>
        </div>    
    )
}

export default Resume;