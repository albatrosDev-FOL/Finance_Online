import React, { useState, useRef } from 'react'; // Asegúrate de importar useRef
import './Navbar.css';
import imgConta from '/image/contabilidad.png';
import imgCartera from '/image/Cartera.png';
import imgInformes from '/image/informes.png';
import imgPagos from '/image/pagos.png';
import imgVentas from '/image/ventas.png';
import imgAdministracion from '/image/administracion.png';
import imgTesoreria from '/image/tesoreria.png';
import imgPerfil from '/image/perfil.png';
import imgHome from '/image/home.png';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const Menu = ["Profile", "Your apps", "teatro", "computacion"];

  const menuRef = useRef(); // No se utiliza actualmente, pero lo dejamos si es parte del diseño futuro.

  return (
    <>
      <div className='containerOne'>

        <div className='containerTwo'>


          <div className="container">
            <div
              className="row"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '10px' // Espacio entre columnas (opcional)
              }}
            >
              {[
                { src: imgHome, alt: 'Inicio', label: '' },
                { src: imgAdministracion, alt: 'Administración', label: 'Administración' },
                { src: imgVentas, alt: 'Ventas', label: 'Ventas', toggleMenu: true },
                { src: imgTesoreria, alt: 'Tesorería', label: 'Tesorería' },
                { src: imgPagos, alt: 'Pagos', label: 'Pagos' },
                { src: imgConta, alt: 'Contabilidad', label: 'Contabilidad' },
                { src: imgCartera, alt: 'Cartera', label: 'Cartera' },
                { src: imgInformes, alt: 'Informes', label: 'Informes' },
                { src: imgPerfil, alt: 'Perfil', label: '' }
              ].map(({ src, alt, label, toggleMenu }, index) => (
                <div
                  key={index}
                  className="col"
                  style={{
                    display: 'block',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <a style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
                    <img
                      src={src}
                      alt={alt}
                      style={{ marginBottom: '10px', width: '50px', height: '50px' }} // Ajusta el tamaño según sea necesario
                      onClick={toggleMenu ? () => setOpen(!open) : undefined} // Alternar el menú solo para la opción que lo requiera
                    />
                    {label && <span>{label}</span>}
                    {toggleMenu && open && (
                      <div className="Desplegable" style={{ marginTop: '-20px', display:'flex' }}>
                        <ul>
                          {Menu.map((menu) => (
                            <li key={menu}>{menu}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </a>
                </div>
              ))}
            </div>


          </div>







        </div>

      </div>
    </>
  );
};

export default Navbar;
