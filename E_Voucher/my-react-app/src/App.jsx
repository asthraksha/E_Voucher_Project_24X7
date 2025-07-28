import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Home from './Pages/Home/Home'
import Buyvoucher from './Components/Buyvoucher/Buyvoucher'
import BrandCover from './Components/BrandCover/BrandCover'
import Verify from './Components/Verify/Verify'
import Redeem from './Components/Redeem/Redeem'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Redeem/>
    </>
  )
}

export default App
