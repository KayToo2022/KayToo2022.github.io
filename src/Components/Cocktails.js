import ParticlesBg from "particles-bg";
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import Fade from "react-reveal";
import {useEffect, useState} from "react";
import axios from "axios";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

function Cocktails() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    
    const[searchTerm, changeSearch] = useState("");
    const[cocktailList, setCocktailList] = useState([]);
    const[listLength, setListLength] = useState(0);
    const[showDrink, setShowDrink] = useState(false);
    const[currentDrink, setCD] = useState(-1);
    const[searchBy, setSB] = useState("search.php?s");

    useEffect(() => {
        function handleResize() {
        setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const runSearch = () => {
        console.log("running search")
        if (searchTerm != "") {
            axios.get("https://www.thecocktaildb.com/api/json/v1/1/"+searchBy+"="+searchTerm)
            
            .then((response) => {
                console.log(response.data.drinks)
                setCocktailList(response.data.drinks)
                setListLength(response.data.drinks.length)
            })
        } else {
            setCocktailList([])
            setListLength(0)
        }
    }

    const drinkListRendered = () => {
        // console.log("drink list rendered")
        if (cocktailList == null) {
            return null
        }

        if (cocktailList.length == 1 || windowDimensions.width < 700) {
            const drinks = cocktailList.map((d) => (
                <div
                    style={{
                        width: "60%",
                        height: "auto",
                        marginLeft: "20%",
                        marginRight: "20%",
                        marginBottom: "5%",
                        backgroundColor: "black",
                        float: 'left',    
                    }} 
                    onClick={() => {
                        console.log(cocktailList.indexOf(d))
                        setShowDrink(true)
                        setCD(cocktailList.indexOf(d))
                    }}
                >
                    <img style={{height: '100%', width: '100%', objectFit: "contain"}} src={d.strDrinkThumb}/>
                    {/* {cocktailList.indexOf(d)}.&nbsp;  */}
                    <div style={{width: "80%", marginLeft: "10%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: "1.5em", height: "1.5em"}}>
                        {d.strDrink}
                    </div>
                    
                </div>    
            ))

            return drinks
        } else if (cocktailList.length == 2) {
            const drinks = cocktailList.map((d) => (
                <div
                    style={{
                        width: "45%",
                        marginLeft: "2.5%",
                        marginRight: "2.5%",
                        marginBottom: "5%",
                        backgroundColor: "black",
                        float: 'left',    
                    }} 
                    onClick={() => {
                        console.log(cocktailList.indexOf(d))
                        setShowDrink(true)
                        setCD(cocktailList.indexOf(d))
                    }}
                >
                    <img style={{height: '100%', width: '100%', objectFit: "contain"}} src={d.strDrinkThumb}/>
                    {/* {cocktailList.indexOf(d)}.&nbsp;  */}
                    <div style={{width: "80%", marginLeft: "10%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: "1.5em", height: "1.5em"}}>
                        {d.strDrink}
                    </div>
                    
                </div>    
            ))

            return drinks
        } else {
            const drinks = cocktailList.map((d) => (
                <div
                    style={{
                        width: "28%",
                        marginLeft: "2.5%",
                        marginRight: "2.5%",
                        marginBottom: "5%",
                        backgroundColor: "black",
                        float: 'left',
                        
                    }} 
                    onClick={() => {
                        console.log(cocktailList.indexOf(d))
                        if (searchBy == "search.php?s") {
                            setShowDrink(true)
                        }
                        setCD(cocktailList.indexOf(d))
                    }}
                >
                    <img style={{height: '100%', width: '100%', objectFit: "contain"}} src={d.strDrinkThumb}/>
                    {/* {cocktailList.indexOf(d)}.&nbsp;  */}
                    <div style={{width: "80%", marginLeft: "10%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: "1.5em", height: "1.5em"}}>
                        {d.strDrink}
                    </div>
                    
                </div>    
            ))

            return drinks
        }

    }

    const ingredientsRendered = (cd) => {
        const ing = cd.map((i) => (
            <li>
                {i}
            </li>
        ))

        return ing
    }

    const instructionsRendered = (cd) => {
        const ins = cd.map((i) => (
            <li>
                {i}
            </li>
        ))

        return ins
    }

    const parseDrink = () => {
        var cd = cocktailList[currentDrink]

        var ingredientsList = []
        var measurementsList = []
        var stepList = []

        for (var name in cd) {
            if (name.startsWith("strIngredient") && cd[name] != null) {
                ingredientsList.push(cd[name])
            }

            if (name.startsWith("strMeasure") && cd[name] != null) {
                measurementsList.push(cd[name])
            }

            if (name == "strInstructions" && cd[name] != null) {
                stepList = cd[name].split('.')
            }
        }

        console.log(ingredientsList)
        console.log(measurementsList)
        console.log(stepList)

        var stepList2 = []

        stepList.forEach(element => {
            if (element != "") {
                stepList2.push(element)
            }
        });

        var combinedIngredients = []

        for (let i = 0; i < ingredientsList.length; i++) {
            if (measurementsList[i].endsWith(' ')) {
                combinedIngredients.push(measurementsList[i] + ingredientsList[i])
            } else {
                combinedIngredients.push(measurementsList[i] + " " + ingredientsList[i])
            }
        }

        console.log(combinedIngredients)

        var retDrink = {
            name: cd.strDrink,
            ingredients: combinedIngredients,
            steps: stepList2
        }

        console.log(retDrink)
        return retDrink
    }

    const drinkModal = () => {

        if (!showDrink) {
            return null
        } else {
            var cd = parseDrink()
            console.log(cocktailList[currentDrink])

            return (
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        zIndex: "101",
                        left: "0",
                        top: "0",
                        overflow: "auto",
                        position: "fixed",
                        display: "grid",
                        backgroundColor: "rgba(24, 25, 26, 0.8)",
                    }}      
                >
                    <div
                        style={{
                            position: "relative",
                            justifySelf: "center",
                            alignSelf: "center",
                            display: "block",
                            // border: "#ff6505 solid",
                            backgroundColor: "black",
                            height: "auto",
                            width: "80vw",
                            zIndex: "102",
                            // padding: "10px 0px 10px 0px",
                            // borderRadius: "20px",
                        }}

                        // onClick={() => {
                        //     parseDrink();
                        // }}
                    >
                        
                        {/* {cocktailList[currentDrink].strDrink} */}
                        <div style={{width: "40%", height: "100%", float: "left"}}>
                            
                            
                            <img style={{marginTop: "10%", width: '80%', objectFit: "contain", border: "3px solid #cdab4b",}} src={cocktailList[currentDrink].strDrinkThumb}/>

                            <div style={{
                                borderLeft: "2px solid #cdab4b",
                                margin: "5% 0% 10% 10%",
                                fontStyle: "italic"
                            }}>
                                <div>
                                    {cocktailList[currentDrink].strDrink}
                                </div>

                                <div>
                                    Glassware: {cocktailList[currentDrink].strGlass}
                                </div>
                            </div>
                            
                        </div>

                        <div style={{width: "60%", height: "100%", float: "left"}}>
                            <div
                                style= {{
                                    textAlign: "right",
                                    fontWeight: "bolder",
                                    height: "10%",
                                    fontSize: "40px",
                                    marginRight: "5px",
                                    // color: "#cdab4b"
                                }}
                                onClick={() => {
                                    setCD(-1)
                                    setShowDrink(false)
                                }}
                            >
                                &#215;
                            </div>
                            
                            <div style={{textAlign: 'left', fontWeight: "bold", color: "#cdab4b"}}>Ingredients</div>

                            <div style={{
                                borderLeft: "2px solid #cdab4b",
                                marginRight: "10%"
                            }}>
                                
                                <ul style={{textAlign: 'left', fontStyle: "italic"}}>
                                    {ingredientsRendered(cd.ingredients)}
                                </ul>
                            </div>
                            
                            <div style={{textAlign: 'left', fontWeight: "bold", color: "#cdab4b"}}>Instructions</div>

                            <div style={{
                                borderLeft: "2px solid #cdab4b",
                                marginRight: "10%"
                            }}>
                                
                                <ol style={{textAlign: 'left', fontStyle: "italic"}}>
                                    {instructionsRendered(cd.steps)}
                                </ol>
                            </div>
                           
                            
                        </div>
                    </div>
                </div>
            )
        }
    }

    return(
        <div>
            {drinkModal()}

            <div className="testLanding">
                <ParticlesBg type="cobweb" color={["#cdab4b"]} bg={{position: "absolute", zIndex: -1, top: 0, left: 0, backgroundColor: "black"}} style={{height:'100vh'}} num={300}/>
                    <Fade>
                    <div className='Title'>
                        Cocktail Recipies
                    </div>

                    {(windowDimensions.width > 700) ? (
                        <div className="message">
                            If you are reading this, you are either a hiring manager who has read through so many resumes and probably needs a drink, or you are me.
                            In case you are the prior, this little page allows you to look up cocktail recipies from a public API from https://www.thecocktaildb.com/.
                        </div>
                    ) : (<div/>)}

                    
                    <br/>
                    

                    <div className='navPadding'/>
                    <Link  className="downloadButton" to="content" smooth={true} duration={500} spy={true}  style={{height:'auto'}}>Click here to get started</Link>
                    <div className="message">or</div>
                    <a href='/' className="downloadButton">Return to the main page</a>
                </Fade>
            </div>

            <div id="content" style={{backgroundColor: 'black', display: "inline-block", width: "100vw"}}>
                

                <div style={{width: "76%", marginLeft: "12%", marginTop:"2.5%", float: "center"}}>
                    
                    <div
                        className="downloadButton"
                        style={{float: "left", marginRight: "2.5%", marginTop: "1px", marginBottom: "1px"}} 
                        onClick={() => {
                            runSearch()
                        }}
                    >
                        Search
                    </div>
                    <input
                        className="downloadButton"
                        style={{float: "left", border: "none", backgroundColor: "white", color: "black", marginRight: "2.5%", marginTop: "1px", marginBottom: "1px"}} 
                        type="text"
                        onChange={(e) => {
                            console.log(e.target.value)
                            changeSearch(e.target.value)
                        }}
                        onKeyPress={(e) => {
                            if(e.key === 'Enter'){
                                runSearch();
                            }
                        }}
                    />

                    {(windowDimensions.width > 700) ? (
                        <div
                            style={{float: "left", marginRight: "2.5%"}} 
                        >
                            Filter by:
                        </div>
                    ) : (<div/>)}       

                    

                    <select className="downloadButton" style={{float: "left", marginRight: "2.5%", border: "none", margin: "none", padding: "none"}}  onChange={(e) => {
                        setSB(e.target.value)
                    }}>
                        <option value={"search.php?s"}>
                            Name
                        </option>
                        <option value={"filter.php?i"}>
                            Ingredient
                        </option>
                    </select>

                    {(listLength != 0 && windowDimensions.width > 700) ? (
                        <div style={{float: "left", border: "none"}}>
                        {listLength} results
                        </div>
                    ) : (null)}
                    <br/>
                    <br/>
                    <div className="message" style={{width: "100%", textAlign: "center"}}>
                        When searching by name, you can click on the image to pull up the recipe.
                    </div>
                </div>
                
                <br/>
                <div style={{
                    width: "80%",
                    marginLeft: "10%",
                    backgroundColor: "black",
                }}>
                    {drinkListRendered()}
                </div>
            </div>
        </div>
    )
    
}

export default Cocktails