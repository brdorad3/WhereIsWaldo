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
    let rect;
 
    useEffect(() => {
        if(click != false && name != null){
            try {
               
                axios.post("https://whereiswaldo.onrender.com", {coordinates, name}, { withCredentials: true })
                .then(response => {
                    setData(response.data)
                })
                setName(null)
                
            } catch (e) {
                console.log(e);
            }
        }
    }, [coordinates, name]);
    
    const handleClick = () => {
        setToggle(!toggle)
    }

    const handleImageClick = (event) => {
        rect = imageRef.current.getBoundingClientRect();
        setMenu(!menu)
        if (!imageRef.current) return
        
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        setCoordinates2({
            x: x.toFixed(0) ,
            y: y.toFixed(0)
        }) 
        
        x = ((x*100)/rect.width);
        y = ((y*100)/rect.height)
        setCoordinates({
            x: x.toFixed(2),
            y: y.toFixed(2)
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


<div className="flex justify-between items-center px-16 max-sm:px-1 bg-green">
    
<p className="yellow font-black tetx-lg max-sm:text-sm">Where&apos;s Waldo</p>

<div className="flex items-center gap-10 max-sm:gap-1">
<p className="yellow">Find these characters!</p>
<div className="flex items-center gap-5 bg-yellow my-1 rounded-sm px-2 ">
<img src="Wizard.png"  alt="characters" className="icons h-full icon"/>
<p className="cursor-default green font-black">|</p>
<img src="jura.png" alt="characters"  className="icons"/>
<p className="cursor-default green font-black">|</p>
<img src="Oddlaw.png" alt="characters" className="icons"/>
</div>
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
<div className={menu ? "menu" : "nomenu"} style={{left:coordinates2.x + 'px',top:coordinates2.y + 'px'}}>
    <div className="bbottom" onClick={() => handleIconClick("Waldo")}>
        <img src="jura.png" alt="" className="w-full h-full" />
        </div>
    <div className="bbottom" onClick={() => handleIconClick("Wizard")}>
        <img src="Wizard.png" alt="" className="w-full h-full"/>
    </div>
    <div className="" onClick={() => handleIconClick("Oddlaw")}>
        <img src="Oddlaw.png" alt="" className="w-full h-full" />
    </div>
    
</div>

</div>
)
}
export default Game
