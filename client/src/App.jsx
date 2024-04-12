import { Link } from 'react-router-dom'
import Card from './card'
import './App.css'

function App() {
  

  return (
    <div className='bg-green'>
    <header className='ybb'>
    <div className='flex justify-center yellow text-3xl '>
     <h1 className='p-4 comic font-black'>Where's Waldo?</h1>

     </div>
    </header>
    <div className='body'>
    <Card/>
    </div>
    
     
        
    </div>
  )
}

export default App
