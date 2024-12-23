import { useState } from 'react'
import Form from '../../features/Login/components/Form/Form'
import Sucursales from '../../features/Sucursales/components/Form/Sucursales'
import TrazaDoc from '../../features/TrazaDoc/TrazaDoc'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path='/Sucursales' element={<Sucursales/>}/>
      <Route path='/TrazaDoc' element={<TrazaDoc/>}/>
    </Routes>
    </Router>
  
    </>
  )
}

export default App
