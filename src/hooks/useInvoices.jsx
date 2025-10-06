import { useState, useEffect } from "react";
import FacturaService from "../services/FacturaService"

export const useInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [queryType, setQueryType] = useState(1);
    const [searchFilters, setSearchFilters] = useState({
        startDate: null,
        endDate: null,
        invoiceNumber: "",
        customerId: ""
    });

    const fetchInvoices = async () => {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("Token");
        const branchId = localStorage.getItem("SucursalId");

        const requestData = {
            FinalDate: formatDate(searchFilters.endDate),
            InitialDate: formatDate(searchFilters.startDate),
            Invoicenumber: searchFilters.invoiceNumber,
            Querytype: queryType,
            ThirdPartyId: searchFilters.customerId ? parseInt(searchFilters.customerId) : 1,
            Travelagyid: branchId,
        };

        console.log("🔍 Enviando petición con:", {
            queryType,
            searchFilters,
            requestData
        });

        try {
            const response = await FacturaService.postListarFactura(requestData, token);
            console.log("✅ Respuesta recibida desde el useinvoices:", response);

            setInvoices(response?.InvoiceResult || response?.InvoiceList || []);
        } catch (error) {
            console.error("❌ Error al obtener facturas:", error);
            setError("Error al cargar las facturas");
            setInvoices([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return "";
        const dateObj = date instanceof Date ? date : new Date(date);
        return dateObj.toISOString().split("T")[0];
    };

    // ✅ SOLO cargar las últimas 10 al iniciar
    useEffect(() => {
        if (queryType === 1) {
            fetchInvoices();
        }
    }, []); // ✅ Solo al montar el componente

    return {
        invoices,
        loading,
        error,
        queryType,
        setQueryType,
        searchFilters,
        setSearchFilters,
        refetchInvoices: fetchInvoices // ✅ Función manual para ejecutar búsqueda
    };
}                           