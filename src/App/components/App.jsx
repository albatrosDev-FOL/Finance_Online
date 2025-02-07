import { useState } from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import AppLayout from '../../shared/components/layouts/AppLayout';
import Form from '../../features/Login/components/Form/Form'
import Sucursales from '../../features/Sucursales/components/Form/Sucursales'
import TrazaDoc from '../../features/TrazaDoc/TrazaDoc'
import ListadoFacturacion from '../../features/Facturas/listado/listado'

function App() {
  return (
    <AppLayout>
    <Router>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path='/Sucursales' element={<Sucursales/>}/>
      <Route path='/TrazaDoc/:id' element={<TrazaDoc/>}/>

      <Route path="/ListadoFacturacion" element={<ListadoFacturacion />} />
    </Routes>
    </Router>
  
    </AppLayout>
  )
}

export default App;
