import { useState, useRef, useEffect } from "react"

function Game() {
    const imageRef = useRef(null);
    const [coordinates, setCoordinates] = useState({
        x: '',
        y: ''
    });
    const [toggle, setToggle] = useState(false)
    const handleClick = () => {
        setToggle(!toggle)
        console.log(toggle)
    }
    const handleImageClick = (event) => {
        
        if (!imageRef.current) return
        const rect = imageRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / imageRef.current.width * imageRef.current.naturalWidth;
    const y = (event.clientY - rect.top) / imageRef.current.height * imageRef.current.naturalHeight;
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
<img onClick={handleImageClick} src="wal2.png" className={toggle ? 'img' : 'no-img' } alt="" onLoad={() => console.log('Image loaded')} ref={imageRef}/>

</>
)
}
export default Game