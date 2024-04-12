import { Link } from "react-router-dom"

function Card(){
    return(
        <>
        <div className="flex flex-col yb p-6 rounded-3xl ">
            <img className="miniimg rounded-xl" src="wal.webp" alt="" />
        <Link to="/game" className='p-2 self-center rounded-xl bg-yellow green text-2xl font-black mt-5'>START</Link>


        </div>
        </>
    )
}
export default Card