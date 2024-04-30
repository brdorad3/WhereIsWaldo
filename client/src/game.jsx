import { useState, useRef, useEffect } from "react"
import axios from "axios";

function Game() {
    const imageRef = useRef(null);
    const [coordinates, setCoordinates] = useState({
        x: '',
        y: '', 
    });
    const [coordinates2, setCoordinates2] = useState({
        x: '',
        y: '',
    });
    const [name, setName] = useState(null)
    
    const [toggle, setToggle] = useState(false);
    const [menu, setMenu] = useState(false);
    const [click, setClick] = useState(false);
    const [data, setData] = useState(null)

    useEffect(()=>{
        fetchData
    },[coordinates])
    useEffect(() => {
        if(click != false && name != null){
        if (coordinates.x && coordinates.y) {
            try {
                if(toggle == false){
                    axios.post("http://localhost:3000", {coordinates2, name}, { withCredentials: true }); 
                }else{
                    
                axios.post("http://localhost:3000", {coordinates, name}, { withCredentials: true });
                }
            } catch (e) {
                console.log(e);
            }
        }}
    }, [coordinates, name]);

    const fetchData = async() => 
    {
        const response = await fetch("http://localhost:3000")
        const res = await response.json();
        setData(res)
    }
    


    const handleClick = () => {
        setToggle(!toggle)
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
        setClick(!click)
    }
    const handleIconClick = (char) =>{
        setName(char)
        
       
    }
return(
<>
{data && 
alert(data)
}
<p onClick={handleClick} >Zoom in/out</p>
<img src="walchar2.jpg" alt="" />
<img onClick={handleImageClick} src="wal2.png" className={toggle ? 'img' : 'no-img' } alt="" ref={imageRef}/>

<div className={menu ? "menu" : "nomenu"} style={{left:coordinates.x + 'px',top:coordinates.y + 'px'}}>
    <div className="bbottom" onClick={() => handleIconClick("Waldo")}>
        <img src="jura.png" alt="" className="w-15 h-24" />
        </div>
    <div className="bbottom" onClick={() => handleIconClick("Wizard")}>
        <img src="Wizard.png" alt="" className="w-20 h-24"/>
    </div>
    <div className="" onClick={() => handleIconClick("Oddlaw")}>
        <img src="Oddlaw.png" alt="" className="w-20 h-24" />
    </div>
</div>
</>
)
}
export default Game