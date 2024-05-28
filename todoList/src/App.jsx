import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import checklistIcon from './assets/checklist-icon.png';
import Task from './components/Task';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
        {/* <img src={checklistIcon} alt="Checklist Icon" /> */}
      <Task/>
    </>
  )
}

export default App
