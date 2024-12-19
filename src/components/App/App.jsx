import { useState } from 'react'
import Form from '../login/Form/Form'
import Sucursales from '../Sucursales/Sucursales'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path='/Sucursales' element={<Sucursales/>}/>
    </Routes>
    </Router>
  
    </>
  )
}

export default App
