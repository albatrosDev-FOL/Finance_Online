import React, { useState, useEffect } from "react";
import { Button, Form, Modal, ListGroup } from "react-bootstrap";

function AirportSearchModal({
  show,
  onClose,
  airports,
  onSelectAirport,
  field
}) {
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("name"); // name o code
  const [filtered, setFiltered] = useState([]);

  const handleSearch = () => {
    if (!search.trim()) {
      setFiltered(airports);
      return;
    }

    const results = airports.filter((airport) => {
      if (searchBy === "name") {
        return airport.Name.toLowerCase().includes(search.toLowerCase());
      }
      if (searchBy === "code") {
        return airport.IATACode.toLowerCase().includes(search.toLowerCase());
      }
      return false;
    });

    setFiltered(results);
  };

  const handleSelect = (airport) => {
    onSelectAirport(airport, field);
    onClose();
  };

  // Mostrar todos al abrir si no hay búsqueda
  useEffect(() => {
    if (show) {
      setSearch("");
      setSearchBy("name");
      setFiltered(airports);
    }
  }, [show, airports]);

  // 🔹 Filtrar automáticamente al escribir
  useEffect(() => {
    handleSearch();
  }, [search, searchBy]);

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Buscar Aeropuerto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Barra de búsqueda */}
        <Form.Control
          type="text"
          placeholder={
            searchBy === "name"
              ? "Ingrese el nombre del aeropuerto"
              : "Ingrese el código IATA"
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Selector de tipo de búsqueda */}
        <div className="mt-2">
          <Form.Check
            inline
            label="Nombre"
            type="radio"
            name="searchBy"
            checked={searchBy === "name"}
            onChange={() => setSearchBy("name")}
          />
          <Form.Check
            inline
            label="Código IATA"
            type="radio"
            name="searchBy"
            checked={searchBy === "code"}
            onChange={() => setSearchBy("code")}
          />
        </div>

        {/* Botón de búsqueda opcional */}
        <Button
          variant="primary"
          className="mt-2 mb-2"
          onClick={handleSearch}
        >
          Buscar
        </Button>

        {/* Lista de resultados */}
        <ListGroup style={{ maxHeight: "200px", overflowY: "auto" }}>
          {filtered.length > 0 ? (
            filtered.map((airport) => (
              <ListGroup.Item
                key={airport.IATACode}
                action
                onClick={() => handleSelect(airport)}
              >
                {airport.IATACode}, {airport.Name}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No se encontraron resultados</ListGroup.Item>
          )}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AirportSearchModal;
