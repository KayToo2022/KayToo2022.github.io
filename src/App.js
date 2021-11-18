import {
  HideBetween,
  HideDuring,
  HideOn,
  HideScroll,
} from "react-hide-on-scroll";
import './App.css';

import ParticlesBg from "particles-bg";

import Header from "./Components/Header";
import Landing from "./Components/Landing"
import About from "./Components/About"
import Resume from "./Components/Resume"
import Portfolio from "./Components/Portfolio"
import Contact from "./Components/Contact"

function App() {
  return (
    <div className="App">
      
      
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
      {/* <Contact/> */}

      {/* <div id="contact" style={{height: '2000px', width: "100%", backgroundColor: 'red'}}>
        div filler
      </div> */}
      <div style={{width:'100%', backgroundColor:'black'}}>
        <p style={{fontSize:'12px', color:'gray'}}>
          v1.1.4
        </p>
      </div>
    </div>
  );
}

export default App;
