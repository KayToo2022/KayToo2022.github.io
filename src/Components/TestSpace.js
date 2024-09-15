import ParticlesBg from "particles-bg";
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import {useEffect, useState} from "react";
import ReactSlider from "react-slider";
import axios from "axios";

import SkillBar from "./skill_bar/SkillBar"
import DropdownBox from "./dropdown_box/DropdownBox"

function TestSpace() {

    const[sliderVal, changeSlider] = useState(50);
    const[searchTerm, changeSearch] = useState("");

    var rgbColor = ''

    if (sliderVal >= 50) {
        rgbColor = `rgb(${-510/100 * (sliderVal-100)},255,0)`
    } else {
        rgbColor = `rgb(255,${510/100 * sliderVal},0)`
    }

    var gradCourses = ["Data Structures & Algorithms in Python", "Math Foundations for Decisions & Data Sciences", "AI and Data Engineering", "Data Mining"]
    var undergradCoursesMath = ["Discrete Math", "Calculus III", "Linear Algebra I", "Ordinary Differential Equations and Dynamical Systems", "Intro to Combinatorics", "Applied Probability and Statistics I", "Applied Algebra", "Complex Variables", "Math Modeling", "Intro to Graph Theory"]
    var undergradCoursesCS = ["Data Structures & Algorithms", "Object Oriented Design", "Intro to Computer Graphics", "Advanced Python Programming", "Numerical Analysis and Scientific Computing", "Intro to Artificial Intelligence", "Computer Game Design and Programming", "Formal Languages and Computability"]
    // window.scrollTo(0, 0);
    return(
        <div>
            <div className="testLanding">
                <ParticlesBg type="cobweb" color="#0055A2" bg={true} style={{height:'100vh'}} num={420}/>
                <div className='Title'>
                    Congratulations! You found my secret testing area.
                </div>
                <div className="message">
                    There isn't really much for you to see here unless you 
                    want to see what I am working on. You're welcome to stay 
                    but if you want to leave, click the button below. Otherwise,
                    keep on scrolling.
                </div>
                <div className='navPadding'/>
                <a href='/' className="downloadButton">Return to the main page</a>
            </div>

            <div className="MainContent" >
                
                <div className="gridWrapper">
                    <div className="gridBoxMobile">
                        

                        <div className='navPadding'/>

                        <h1 style={{fontSize:'28px'}}>Skill Bar</h1>
                        <h1 style={{textTransform: 'none'}}>
                            This is a custom component that can be used to display percentages as 
                            progress bars.
                        </h1>
                        <h1 style={{textTransform: 'none'}}>
                            The progress bars take the following props:
                            <li>
                                name (title above skill)
                            </li>
                            <li>
                                percent (amount of bar filled, random when empty)
                            </li>
                            <li>
                                color (color of bar, random when empty)
                            </li>
                            <li>
                                enableAbility (skill marker underneath bar, adjusts to percent levels)
                            </li>
                        </h1>

                        <SkillBar name="Skill 1" percent="70" color="#F26522"/>
                        
                        <SkillBar name="Skill 2" percent="30" color="maroon" enableAbility={true}/>

                        <SkillBar name="Skill 3" percent="80" color="forestgreen" enableAbility={true}/>
                        
                        <SkillBar name="Skill 4 (use slider to adjust)" percent={sliderVal}  color={rgbColor} enableAbility={true}/>
                        <ReactSlider 
                            min={0} 
                            max={100} 
                            className="horizontal-slider" 
                            thumbClassName="example-thumb" 
                            trackClassName="example-track"
                            defaultValue={sliderVal}
                            onChange={(value) => {
                                    changeSlider(value)
                                    console.log(value)
                                }
                            }
                        />
                        <div style={{width:'100%', height:"30px"}}/>
                        
                        <DropdownBox title="test" color="red" items = {undergradCoursesMath} columns = {2}></DropdownBox>
                        <DropdownBox title="test" color="red" items = {undergradCoursesCS} columns = {2}></DropdownBox>
                        
                    </div>
                    
                </div>
                {/* <SkillBar skill="Testing" progress="95" color="#F26522"/>
                <SkillBar skill="Testing1" progress="40" color="yellow"/> */}

                
            </div>

            <div>
                <input 
                    type="text"
                    onChange={(e) => {
                            changeSearch(e.target.value)
                            // console.log(e.target.value)
                        }
                    }
                />
                <button
                    onClick={() => {
                        axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+searchTerm)
                        .then((response) => {
                            console.log(response.data.drinks)
                        })
                    }}
                >
                    Test
                </button>
            </div>
            <br/>

            <div>
                
            </div>
        </div>
        
    )
}

export default TestSpace;