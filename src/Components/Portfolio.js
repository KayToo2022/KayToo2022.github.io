import Fade from "react-reveal";
import {
    HideBetween,
    HideDuring,
    HideOn,
    HideScroll,
  } from "react-hide-on-scroll";

import M4ME from "./Images/M4ME.png"
import Manifest from "./Images/Manifest.png"
import SF from "./Images/SF.png"
import Ship from "./Images/Ship.png"
import Spheres from "./Images/Spheres.jpg"

function Portfolio() {
    return(
        <div id="portfolio" className="MainContent">
            <div className="navPadding"/>
            <HideOn divID="resume" inverse>
                <Fade>
                    <div className="gridWrapper">
                        <div className="gridBoxL">
                            <div className="resumeTitle underlined">
                                <h1>Web Development</h1>
                            </div>    
                        </div>
                        <div className="gridBoxL">
                            <div className="resumeTitle">
                                <img src={M4ME} style={{width:'50%', marginTop:'16px'}}></img>
                            </div>    
                        </div>
                        <div className="gridBoxR">
                            <h1 className="major">Meals For Me (Infinite Options)</h1>
                            <p className="minor">
                                Meals For Me is a meal subscription service from Infinite Options written in 
                                javascript and React. While I was on this project, I was responsible for 
                                maintaining customer-facing components as well as developing some of the 
                                employee-facing tools. On this project, I developed a tool to confirm delivery 
                                addresses with the United-States Postal Service and a tool to manage Meals For 
                                Me's delivery zones.
                            </p>

                            <a href="https://mealsfor.me/" target="_blank" className="downloadButton">
                                Learn More
                            </a>
                        </div>
                        <div className="gridBoxL">
                            <div className="resumeTitle">
                                <img src={SF} style={{width:'50%', marginTop:'16px', backgroundColor:'white'}}></img>
                            </div>    
                        </div>
                        <div className="gridBoxR">
                            <h1 className="major">Serving Fresh (Infinite Options)</h1>
                            <p className="minor">
                                Serving Fresh is a delivery service written in javascript and React that brings 
                                farmer market produce to your door. While I was on this project, I was responsible 
                                for taking the same zones management system I implemented for Meals For Me and 
                                implementing it for Serving Fresh. This component is solely employee-facing but 
                                feel free to check out their site.
                            </p>

                            <a href="https://servingfresh.me/" target="_blank" className="downloadButton">
                                Learn More
                            </a>
                        </div>
                        <div className="gridBoxL">
                            <div className="resumeTitle">
                                <img src={Manifest} style={{width:'50%', marginTop:'16px', backgroundColor:'white'}}></img>
                            </div>    
                        </div>
                        <div className="gridBoxR">
                            <h1 className="major">Manifest (Infinite Options)</h1>
                            <p className="minor">
                                Manifest is a productivity app developed in a collaboration with Infinite Options and 
                                Tulane University that allows people with short-term memory loss gain control of their 
                                lives. I helped develop their admin site written in javascript and React which allowed 
                                advisors of patients manage their patients.
                            </p>

                            <a href="https://manifestmy.space/" target="_blank" className="downloadButton">
                                Learn More
                            </a>
                        </div>
                        <div className="gridBoxL navPadding"/>
                        <div className="gridBoxL">
                            <div className="resumeTitle underlined">
                                <h1>Software Development</h1>
                            </div>
                        </div>
                        <div className="gridBoxL">
                            <div className="resumeTitle">
                                <img src={Spheres} style={{width:'50%', marginTop:'16px', backgroundColor:'white'}}></img>
                            </div>    
                        </div>
                        <div className="gridBoxR">
                            <h1 className="major">Ray Tracer</h1>
                            <p className="minor">
                                The image on the left was rendered with a raytracer coded in C++ and the openFrameworks 
                                library. The raytracer uses a basic raytracing algorithm to shoot a ray from the camera, 
                                check which object it colides with, and sets the pixel in the image to the proper color. 
                                The code can be found on the Github below.
                            </p>

                            <a href="https://github.com/KayToo2022/RayTracer" target="_blank" className="downloadButton">
                                Learn More
                            </a>
                        </div>
                        <div className="gridBoxL">
                            <div className="resumeTitle">
                                <img src={Ship} style={{width:'50%', marginTop:'16px', backgroundColor:'white'}}></img>
                            </div>    
                        </div>
                        <div className="gridBoxR">
                            <h1 className="major">Flight Simulation Demo</h1>
                            <p className="minor">
                                This flight simulation demo was coded in C++ and the openFrameworks library. It is a simple 
                                game where the player is tasked with landing their ship into a designated landing zone with 
                                a set amount of fuel. The ship on the right is the model of the ship in the demo. The code 
                                can be found on the Github below.
                            </p>

                            <a href="https://github.com/KayToo2022/MarsLander" target="_blank" className="downloadButton">
                                Learn More
                            </a>
                        </div>
                        <div className="gridBoxR">
                            <h1 className="major">AI Hangman</h1>
                            <p className="minor">
                            The AI Hangman project was a study in how different AI approaches can be used in the game of hangman 
                            with both a simple approach and a complex approach in Python. The study used an iterative approach and 
                            a Q-table approach to the game of hangman. The code is not public but the writeup of the project is 
                            available in the link below.
                            </p>

                            <a href="https://docs.google.com/document/d/1uLRyhk7xVR71vjlAi87KWIVEYBNGnM4Zs-OLRljIFlk/edit?usp=sharing" target="_blank" className="downloadButton">
                                Learn More
                            </a>
                        </div>
                        <div className="gridBoxR">
                            <h1 className="major">Tinnitus Clinical System</h1>
                            <p className="minor">
                                The Tinnitus Clinic System project was a study of object oriented design and how it can be applied, 
                                in this case, to a tinnitus clinic. This project's code is not public but the writeup of the project 
                                showcasing UML diagrams of the project is available in the link below.
                            </p>

                            <a href="https://docs.google.com/document/d/17ze1Y0i_vfi8gkIPhUZzENQOjgJuQS4vXhX-iG-JO-E/edit?usp=sharing" target="_blank" className="downloadButton">
                                Learn More
                            </a>
                        </div>
                    </div>
                </Fade>
            </HideOn>
            <div className="navPadding"/>
        </div>    
    )
}

export default Portfolio;