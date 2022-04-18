import {React, useEffect, useState}from "react";
import Fade from "react-reveal";
import {
    HideBetween,
    HideDuring,
    HideOn,
    HideScroll,
} from "react-hide-on-scroll";

import SkillBar from "./skill_bar/SkillBar"

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
            {/* <HideBetween startDivID="about" endDivID="portfolio" inverse> */}
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
                            {/* <h1 className="major">Adobe</h1>
                            <p className="minor">Software Engineering Intern, eCommerce Experiences</p>
                            <p className="info">May 2022 - August 2022</p> */}
                            
                            <h1 className="major">Infinite Options</h1>
                            <p className="minor">Front-End Development Intern</p>
                            <p className="info">May 2021 - August 2021</p>
                            <p className="info">
                                During the summer of 2021, I had the opportunity to intern at Infinite 
                                Options LLC as a Front-End Development Intern where I helped develop 
                                some of their in-house projects, such as Meals For Me and Serving Fresh, 
                                and more.
                                <br/>
                                <br/>
                                As a member of the front-end development team, I was responsible for the 
                                development, maintenance, and quality assurance of our in-house products. 
                                Working with React, I developed features ranging from implementing UI's to 
                                integrating API's.
                            </p>
                        </div>
                        <div className="gridBoxMobile">
                            <div className="resumeTitle underlined">
                                <h1>Organizations</h1>
                            </div>    
                        </div>
                        <div className="gridBoxMobile">
                            <h1 className="major">Hong Kong Students Association</h1>
                            <p className="info">Treasurer • Executive Committee</p>
                            <p className="info">August 2019 - May 2021</p>
                            <p className="info">
                                I joined HKSA as a treasurer intern in January of 2019. As the treasurer of HKSA,
                                I was responsible for the financials of the organization including securing of funds
                                and approving the projects of our event coordinators.
                                <br/><br/>
                                As a member of the Executive Comittee, I was responsible for approving our organizations
                                agenda as well as managing relations between other branches of HKSA.
                            </p>
                        </div>
                        <div className="gridBoxMobile">
                            <div className="resumeTitle underlined">
                                <h1>Skills</h1>
                            </div>    
                        </div>
                        <div className="gridBoxMobile">
                            <SkillBar name="Java" percent="55" className="major" color="rgb(61, 1, 103)"/>
                            <SkillBar name="C++" percent="60" className="major" color="rgb(99, 199, 123)"/>
                            <SkillBar name="Python" percent="85" className="major" color="rgb(7, 123, 228)"/>
                            <SkillBar name="HTML" percent="70" className="major" color="rgb(132, 126, 217)"/>
                            <SkillBar name="CSS" percent="50" className="major" color="rgb(107, 221, 141)"/>
                            <SkillBar name="JavaScript" percent="70" className="major" color="rgb(76, 143, 225)"/>
                            <SkillBar name="React" percent="90" className="major" color="rgb(109, 69, 188)"/>
                            <SkillBar name="Git" percent="65" className="major" color="rgb(108, 223, 240)"/>
                            {/* <SkillBar name="MATLAB" percent="45" className="major" color="rgb(97, 103, 122)"/> */}
                        </div>
                    </div>
                </Fade>
            {/* </HideBetween> */}
            <div className="navPadding"/>
        </div>    
        )
    }

    return(
        <div id="resume" className="MainContent" style={{backgroundColor:"white", color: 'black'}}>
            <div className="navPadding"/>
            {/* <HideBetween startDivID="about" endDivID="portfolio" inverse> */}
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
                            {/* <h1 className="major">Adobe Inc.</h1>
                            <p className="minor">Software Engineering Intern, eCommerce Experiences</p>
                            <p className="info">May 2022 - August 2022</p> */}

                            <h1 className="major">Infinite Options LLC</h1>
                            <p className="minor">Front-End Development Intern</p>
                            <p className="info">May 2021 - August 2021</p>
                            <p className="info">
                                During the summer of 2021, I had the opportunity to intern at Infinite 
                                Options LLC as a Front-End Development Intern where I helped develop 
                                some of their in-house projects, such as Meals For Me and Serving Fresh, 
                                and more.
                                <br/>
                                <br/>
                                As a member of the front-end development team, I was responsible for the 
                                development, maintenance, and quality assurance of our in-house products. 
                                Working with React, I developed features ranging from implementing UI's to 
                                integrating API's.
                            </p>
                        </div>

                        <div className="gridBoxL">
                            <div className="resumeTitle underlined">
                                <h1>Organizations</h1>
                            </div>    
                        </div>
                        <div className="gridBoxR">
                            <h1 className="major">Hong Kong Students Association</h1>
                            <p className="info">Treasurer • Executive Committee</p>
                            <p className="info">August 2019 - May 2021</p>
                            <p className="info">
                                I joined HKSA as a treasurer intern in January of 2019. As the treasurer of HKSA,
                                I was responsible for the financials of the organization including securing of funds
                                and approving the projects of our event coordinators.
                                <br/><br/>
                                As a member of the Executive Comittee, I was responsible for approving our organizations
                                agenda as well as managing relations between other branches of HKSA.
                            </p>
                        </div>

                        <div className="gridBoxL">
                            <div className="resumeTitle underlined">
                                <h1>Skills</h1>
                            </div>    
                        </div>
                        <div className="gridBoxR">
                            <SkillBar name="Java" percent="55" className="major"/>
                            <SkillBar name="C++" percent="60" className="major"/>
                            <SkillBar name="Python" percent="85" className="major"/>
                            <SkillBar name="HTML" percent="70" className="major"/>
                            <SkillBar name="CSS" percent="50" className="major"/>
                            <SkillBar name="JavaScript" percent="70" className="major"/>
                            <SkillBar name="React" percent="90" className="major"/>
                            <SkillBar name="Git" percent="65" className="major"/>
                            {/* <SkillBar name="MATLAB" percent="45" className="major"/> */}
                        </div>
                        
                        
                    </div>
                </Fade>
            {/* </HideBetween> */}
            <div className="navPadding"/>
        </div>    
    )
}

export default Resume;