import { useEffect, useState } from "react";
import "./dropdown_box.css"

function DropdownBox(props) {
    const[toggleVal, setToggle] = useState(false);

    var items = props.items;
    var columns = props.columns;
    var color = props.color;
    var title = props.title;
    // var items = ["Data Structures & Algorithms in Python", "Math Foundations for Decisions & Data Sciences", "AI and Data Engineering", "Data Mining"]
    // var columns = 2;

    var itemWidth = (1/columns)*100;
    console.log(itemWidth)
    
    const renderedItems = () => {
        return (<div style={{height: "auto"}}>
            {
                items.map((item) => (
                    <div key={item}
                    className="smallstuff"
                    style={{
                        width: `${itemWidth}%`,
                        height: "auto",
                        marginTop: "9px",
                        marginBottom: "9px",
                        float: "left", 
                        textAlign: "center",
                        
                    }}>
                        {item}
                    </div>)
                )
            }
        </div>)
    }

    return (
        <div onClick={() => {setToggle(!toggleVal)}} style={{width: "100%", height: "auto", border: "10px", float: "none", backgroundColor: "transparent", display: "inline-block"}}>
            <div style={{width: "100%",marginTop: "9px",marginBottom: "9px"}}/>
            <div className="dropdown" style={{float: "none", width: "100%"}}>
                <div className={toggleVal ? ("triangledown"):("triangleright")}/>
                {title}
            </div>
            {
                (!toggleVal) ? (
                    <div style={{width: "100%"}}/>
                ) : (
                    <div style={{width: "100%"}}>
                        {renderedItems()
                            // items.map((item) => (
                            //     <p key = {item}
                            //         className="info"
                            //         style={{
                            //             width: `${itemWidth}%`,
                            //             float: "left", 
                            //             textAlign: "center",
                            //         }}>
                            //         {item}
                            //     </p>
                            // ))
                        }
                        <div style={{width: "100%"}}/>
                    </div>      

                    
                )
            }
        </div>
        
    )
    
}

export default DropdownBox;