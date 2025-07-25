// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthGuard } from '../../guards/AuthGuard';
import Form from '../../features/Login/components/Form/Form'
import Sucursales from '../../features/Sucursales/components/Form/Sucursales'
import TrazaDoc from '../../features/TrazaDoc/TrazaDoc'
import AppLayout from '../../shared/components/layouts/AppLayout'; // Importa el layout correctamente
import ListadoFacturacion from '../../features/Facturas/listado/listado'
import DetalleFacturas from '../../features/Facturas/detalles/detalles'
import RepresentacionGrafica from "../../features/Facturas/grafica/grafica"

function App() {

  return (

    <AppLayout>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path='/Sucursales' element={<AuthGuard><Sucursales /></AuthGuard>} />
          <Route path='/TrazaDoc/:id' element={<AuthGuard><TrazaDoc /></AuthGuard>} />
          <Route path="/ListadoFacturacion" element={<AuthGuard><ListadoFacturacion /></AuthGuard>} />
          <Route path='/DetallesFacturacion' element={<AuthGuard><DetalleFacturas /></AuthGuard>} />
          <Route path='/RepresentacionGrafica' element={<AuthGuard><RepresentacionGrafica /></AuthGuard>} />

        </Routes>
      </Router>

    </AppLayout>

  )
}

export default App;
