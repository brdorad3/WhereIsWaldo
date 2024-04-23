import { useState, useRef, useEffect } from "react"

function Game() {
    const imageRef = useRef(null);
    const [coordinates, setCoordinates] = useState({
        x: '',
        y: ''
    });
    const [toggle, setToggle] = useState(false)
    const [menu, setMenu] = useState(false)
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
        
    }
    useEffect(() => {
        if(coordinates.x >605 && coordinates.x< 635 && coordinates.y > 275 && coordinates.y < 365){
            console.log("w")
        }
    }, [coordinates]);
    

return(
<>
<p onClick={handleClick} >Zoom in/out</p>
<img src="walchar2.jpg" alt="" />
<img onClick={handleImageClick} src="wal2.png" className={toggle ? 'img' : 'no-img' } alt="" ref={imageRef}/>
{console.log(coordinates.y)}
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