import { useState } from "react"

function Game() {

    const [toggle, setToggle] = useState(false)
    const handleClick = () => {
        setToggle(!toggle)
        console.log(toggle)
    }

return(
<>
<p onClick={handleClick} >Zoom in/out</p>
<img src="wal.webp" className={toggle ? 'img' : 'no-img' } alt="" />

</>
)
}
export default Game