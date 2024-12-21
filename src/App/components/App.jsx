import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from '../../features/Login/components/Form/Form';
import Sucursales from '../../features/Sucursales/components/Form/Sucursales';
import AppLayout from '../../shared/components/layouts/AppLayout'; // Importa el layout correctamente

function App() {
  return (
    <AppLayout>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/Sucursales" element={<Sucursales />} />
        </Routes>
      </Router>
    </AppLayout>
  );
}

export default App;
