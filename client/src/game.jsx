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
    const [chars, setChars] = useState({
        waldo: false,
        wizard: false,
        oddlaw: false
    })

 
    useEffect(() => {
        if(click != false && name != null){
        if (coordinates.x && coordinates.y) {
            try {
                if(toggle == false){
                   // axios.post("https://whereiswaldo.onrender.com", {coordinates2, name}, { withCredentials: true })
                   axios.post("http://localhost:3000", {coordinates2, name}, { withCredentials: true })
                    .then(response => {
                        setData(response.data)
                    })
                    setName(null)
                }else{
                    
               // axios.post("https://whereiswaldo.onrender.com", {coordinates, name}, { withCredentials: true })
               axios.post("http://localhost:3000", {coordinates, name}, { withCredentials: true })
                .then(response => {
                    setData(response.data)
                })
                setName(null)
                }
            } catch (e) {
                console.log(e);
            }
        }}
    }, [coordinates, coordinates2, name]);
    
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
        setClick(prevClick => !prevClick);

    }

    const handleIconClick = (char) =>{
        setName(char)   

    }
    
    useEffect(()=>{
        if(data){
            if(data != 'bad'){
                switch(data){
                    case 'Waldo': 
                    setChars({
                        ...chars,
                        waldo: true
                     })
                     break;
                     case 'Wizard': 
                    setChars({
                        ...chars,
                        wizard: true
                     })
                     break;
                     case 'Oddlaw': 
                    setChars({
                        ...chars, 
                        oddlaw: true
                     })
                     break;
                }
            }
        }
    },[data, name])
    
    

return(
<div >


<div className="flex justify-between items-center">
<p onClick={handleClick} >Zoom in/out</p>
<div className="flex items-center gap-5">
<p>Find these characters!</p>
<img src="Wizard.png" width="3%" alt="" />
<img src="jura.png" alt="" width="2.5%" />
<img src="Oddlaw.png" alt="" width="2.5%" />
</div>
</div>
<div className="relative">
<img onClick={handleImageClick} src="wal2.png" className={toggle ? 'img' : 'no-img' } alt="" ref={imageRef} />
{chars.waldo == true &&
<img src="circ.png" alt="" className={toggle ? 'false' : 'true'} />
}

{chars.wizard == true &&
<img src="circ.png" alt="" className={toggle ? 'false2' : 'true2'} />
}

{chars.oddlaw == true &&
<img src="circ.png" alt="" className={toggle ? 'false3' : 'true3'} />
}

</div>

<div className={menu ? "menu" : "nomenu"} style={{left:coordinates.x + 'px',top:coordinates.y + 'px'}}>
    <div className="bbottom" onClick={() => handleIconClick("Waldo")}>
        <img src="jura.png" alt="" className="w-15 h" />
        </div>
    <div className="bbottom" onClick={() => handleIconClick("Wizard")}>
        <img src="Wizard.png" alt="" className="w-20 h"/>
    </div>
    <div className="" onClick={() => handleIconClick("Oddlaw")}>
        <img src="Oddlaw.png" alt="" className="w-20 h" />
    </div>
    
</div>

</div>
)
}
export default Game
