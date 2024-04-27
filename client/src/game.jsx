import { useState, useRef, useEffect } from "react"
import axios from "axios";

function Game() {
    const imageRef = useRef(null);
    const [coordinates, setCoordinates] = useState({
        x: '',
        y: ''
    });
    const [coordinates2, setCoordinates2] = useState({
        x: '',
        y: ''
    });
    
    const [toggle, setToggle] = useState(false)
    const [menu, setMenu] = useState(false)

    useEffect(() => {
        console.log("Coordinates:", coordinates);
        console.log("Coordinates2: ", coordinates2)
    }, [coordinates]);
    useEffect(() => {
        if (coordinates.x && coordinates.y) {
            try {
                if(toggle == false){
                    console.log("WW")
                    axios.post("http://localhost:3000", coordinates2, { withCredentials: true }); 
                }else{
                    
                axios.post("http://localhost:3000", coordinates, { withCredentials: true });
                }
            } catch (e) {
                console.log(e);
            }
        }
    }, [coordinates]);


    const handleClick = () => {
        setToggle(!toggle)
        
        console.log(toggle)
    }

   
    const handleImageClick = (event) => {
        setMenu(!menu)
        if (!imageRef.current) return
        const rect = imageRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setCoordinates({
            x: x.toFixed(0),
            y: y.toFixed(0)
        })   
        setCoordinates2({
            x: (x * 1.785).toFixed(0) ,
            y: (y * 1.785).toFixed(0)
        }) 
    }
return(
<>
<p onClick={handleClick} >Zoom in/out</p>
<img src="walchar2.jpg" alt="" />
<img onClick={handleImageClick} src="wal2.png" className={toggle ? 'img' : 'no-img' } alt="" ref={imageRef}/>

<div className={menu ? "menu" : "nomenu"} style={{left:coordinates.x + 'px',top:coordinates.y + 'px'}}>
    <div className="bbottom">
        <img src="jura.png" alt="" className="w-15 h-24" />
        </div>
    <div className="bbottom">
        <img src="Wizard.png" alt="" className="w-20 h-24"/>
    </div>
    <div className="">
        <img src="Oddlaw.png" alt="" className="w-20 h-24" />
    </div>
</div>
</>
)
}
export default Game

