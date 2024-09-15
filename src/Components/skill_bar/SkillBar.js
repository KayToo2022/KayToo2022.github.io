import "./SkillBar.css"

function SkillBar(props) {
    // if (props.name == null || props.percent == null) {
    //     return null
    // }
    var percent = props.percent;
    var color = props.color;
    var ability = '';

    console.log(color)

    if (props.percent == null) {
        percent = Math.random() * 100
    }

    if (props.color == null) {
        color= `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    }

    if (props.enableAbility == true) {
        if (percent < 20) {
            ability = "Beginner"
        }
        if (percent >= 20) {
            ability = "Novice"
        }
        if (percent >= 40) {
            ability = "Average"
        }
        if (percent >= 60) {
            ability = "Good"
        }
        if (percent >= 70) {
            ability = "Comptent"
        }
        if (percent >= 80) {
            ability = "Proficient"
        }
        if (percent >= 90) {
            ability = "Excellent"
        }
        // if (percent >= 95) {
        //     ability = "Advanced"
        // }
    }

    return(
        <div style={{width: '100%'}}>
            <h1 style={{marginTop: '20px'}} className={props.className}>{props.name}</h1>
            <div style={{width: '100%', height: '42px'}}>
                <div style={{backgroundColor:`${color}`, width: `${percent}%`, height: '42px', float: 'left'}}/>
                <div style={{backgroundColor:'gray', width: `${100 - percent}%`, height: '42px', float: 'left'}}/>
                
            </div>
            {
                props.enableAbility
                    ? (
                        <div style={{width: '100%', height: '20px'}}>
                            <div style={{transform: `translateX(${percent}%)`}}>
                                <div style={{width: '10%', transform: `translateX(-50%)`, textAlign:'center'}}>
                                    {ability}
                                </div>
                                
                            </div>
                        </div>
                    )
                    : null
            }
            
            
        </div>
    )
}

export default SkillBar;