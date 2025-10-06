// hooks/useCustomers.js
import { useState, useEffect } from 'react';
import FacturaService from '../services/FacturaService';

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchOption, setSearchOption] = useState("mostrar_todos");
  const [searchValue, setSearchValue] = useState("");

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    
    const token = localStorage.getItem("Token");
    const branchId = localStorage.getItem("SucursalId");

    try {
      const response = await FacturaService.getDetalles(branchId, token, {});

      if (response?.CustomerList) {
        const customersData = response.CustomerList.map(customer => ({
          documentNumber: customer.DocumentNumber,
          firstName: customer.FirstName,
          lastName: customer.LastName,
          isEnabled: customer.IsEnabled || true,
          rawData: customer,
        }));

        setCustomers(customersData);
        setFilteredCustomers(customersData);
      }
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      setError("Error al cargar los clientes");
      setCustomers([]);
      setFilteredCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const filterCustomers = () => {
    if (searchOption === "mostrar_todos") {
      setFilteredCustomers(customers);
      return;
    }

    const filtered = customers.filter(customer => {
      const searchTerm = searchValue.toLowerCase();

      switch (searchOption) {
        case "identificacion":
          return customer.documentNumber.toLowerCase().includes(searchTerm);
        case "nombre":
          return customer.firstName.toLowerCase().includes(searchTerm);
        case "apellido":
          return customer.lastName.toLowerCase().includes(searchTerm);
        default:
          return true;
      }
    });

    setFilteredCustomers(filtered);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [searchValue, searchOption, customers]);

  const clearFilters = () => {
    setSearchOption("mostrar_todos");
    setSearchValue("");
  };

  return {
    customers: filteredCustomers,
    loading,
    error,
    searchOption,
    setSearchOption,
    searchValue,
    setSearchValue,
    clearFilters,
    refetchCustomers: fetchCustomers
  };
};