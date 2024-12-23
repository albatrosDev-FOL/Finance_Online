import { useState } from 'react'
import Form from '../../features/Login/components/Form/Form'
import Sucursales from '../../features/Sucursales/components/Form/Sucursales'
import TrazaDoc from '../../features/TrazaDoc/TrazaDoc'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import AppLayout from '../../shared/components/layouts/AppLayout'; // Importa el layout correctamente

function App() {
  return (
    <AppLayout>
    <Router>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path='/Sucursales' element={<Sucursales/>}/>
      <Route path='/TrazaDoc' element={<TrazaDoc/>}/>
    </Routes>
    </Router>
  
    </AppLayout>
  )
}

export default App;
