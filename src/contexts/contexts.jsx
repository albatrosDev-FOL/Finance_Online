import React, { createContext, useContext, useState, useEffect } from 'react';

const TrmContext = createContext();

export const useTrm = () => {
  const context = useContext(TrmContext);
  if (!context) {
    throw new Error('useTrm debe ser usado dentro de un TrmProvider');
  }
  return context;
};

export const TrmProvider = ({ children }) => {
  const [trmEditValue, setTrmEditValue] = useState(0);
  const [trmData, setTrmData] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState(1);

  // Función para calcular tarifa extranjera
  const calcularTarifaExtranjera = (tarifa) => {
    if (tarifa && trmEditValue > 0) {
      const resultado = parseFloat(tarifa) / parseFloat(trmEditValue);
      return resultado.toFixed(2);
    }
    return "";
  };

  return (
    <TrmContext.Provider value={{
      trmEditValue,
      setTrmEditValue,
      trmData,
      setTrmData,
      selectedProductType,
      setSelectedProductType,
      calcularTarifaExtranjera
    }}>
      {children}
    </TrmContext.Provider>
  );
};