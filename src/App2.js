import { useEffect, useState } from "react";
import {
  HideBetween,
  HideDuring,
  HideOn,
  HideScroll,
} from "react-hide-on-scroll";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useHistory,
  HashRouter
} from "react-router-dom";
import './App.css';

import ParticlesBg from "particles-bg";

import Header from "./Components/Header";
import Landing from "./Components/Landing"
import About from "./Components/About"
import Resume from "./Components/Resume"
import Portfolio from "./Components/Portfolio"
import Cocktails from "./Components/Cocktails"
import TestSpace from "./Components/TestSpace"
import SkillBar from "./Components/skill_bar/SkillBar"
import Wordle from "./Components/Wordle"
import NotFound from "./Components/NotFound"

function App2() {
  var urlData = window.location.href
  const [page, setPage] = useState("")

  useEffect(()=> {

    var urlSplit = urlData.split("/")

    console.log(urlSplit[3])

    function handleUrlChange() {

      urlData = window.location.href
      var urlSplit = urlData.split("/")
      setPage(urlSplit[3])
    }
    window.addEventListener(
      'hashchange',
      handleUrlChange,
      false
  );
  }, []);

  const mainComponents = () => {
    // Place main web components in here
    return (
      <div style={{width:'100vw'}}>
        <HideDuring inverse>
          <Header/>
        </HideDuring>
        <HideScroll variant="down" showOnPageInit={true}>
          <HideScroll variant="up">
            <Header/>
          </HideScroll>
        </HideScroll>

        <Landing/>
        <About/>
        <Resume/>
        <Portfolio/>

        {/* <div style={{width:'100%', backgroundColor:'black'}}>
          <p style={{fontSize:'12px', color:'gray'}}>
            v1.1.4
          </p>
        </div> */}
      </div>
    )
  }

  const testComponents = () => {
    // Experimental space, go to {url}/#/test to view
    return (
      <div style={{width:'100vw', height:'100vh'}}>
        <HideDuring inverse>
          <Header/>
        </HideDuring>
        <HideScroll variant="down" showOnPageInit={true}>
          <HideScroll variant="up">
            <Header/>
          </HideScroll>
        </HideScroll>

        <Landing/>
        <About/>
        <Resume/>
        <Portfolio/>

      </div>
    )
  }

  const renderSwitch = (param) => {
    switch(param) {
      case 'test':
        console.log("Test")
        return(<TestSpace/>)
      case 'cocktail':
        console.log("cocktail")
        return(<Cocktails/>)
      case 'wordle':
        console.log("wordle")
        return(<Wordle/>)
      default:
        console.log("default")
        return(mainComponents())
        
        
        
    }
  }

  return (
    <div className="App">

      {/* <Routes>
        <Route exact path='/' element={
          <div>
            {mainComponents()}
          </div>
        }/>
        <Route path='/test' element={
          <TestSpace/>
        }/>
        <Route path='/cocktails' element={
          <Cocktails/>
        }/>
        <Route path='/wordle' element={
          <Wordle/>
        }/>
        <Route path='/wordle/:id' element={
          <Wordle/>
        }/>
        <Route element={<NotFound/>}/>
        
      </Routes> */}
      {renderSwitch(page)}
      <div style={{width:'100%', backgroundColor:'black'}}>
          <p style={{fontSize:'12px', color:'gray'}}>
            v3.8.2 (app2)
          </p>
        </div>
      
    </div>
  );
}

export default App2;
