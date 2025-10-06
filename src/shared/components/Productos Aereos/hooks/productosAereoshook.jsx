import { useState, useCallback } from 'react';
import FacturaService from '../../../../services/FacturaService'
import { useTrm } from '../../../../contexts/contexts';
import ProductosAereosService from '../../../../services/ProductosAereosService';

export const useProductosAereos = () => {

    const { selectedProductType } = useTrm();


    const [productData, setProductData] = useState({
        selectedProductId: "",
        selectedSubProduct: "",
        selectedIdProduct: "",
        products: [],
        suppliers: [],
        taxes: [],
        neto:[],
        destinations: [],
        classes: [],
        paymentMethods: [],
        nationalAirports: [],
        internationalAirports: []
    });


    const [loadingStates, setLoadingStates] = useState({
        products: false,
        suppliers: false,
        taxes: false,
        destinations: false,
        classes: false,
        paymentMethods: false,
        nationalAirports: false,
        internationalAirports: false
    });

    const [errors, setErrors] = useState({
        products: null,
        suppliers: null,
        taxes: null,
        destinations: null,
        classes: null,
        paymentMethods: null,
        nationalAirports: null,
        internationalAirports: null
    });

    const resetSelections = useCallback(() => {
        setProductData(prev => ({
            ...prev,
            selectedProductId: "",
            selectedSubProduct: "",
            suppliers: [],
            taxes: []
        }));
    }, []);

    // Función para cargar productos aéreos

    const fetchSubProducts = useCallback(async () => {

        try {
            setLoadingStates(prev => ({ ...prev, products: true }));
            setErrors(prev => ({ ...prev, products: null }));

            const token = localStorage.getItem("Token");
            const idSucursal = localStorage.getItem("SucursalId");

            if (!token || !idSucursal) {
                throw new Error("Faltan credenciales necesarias");
            }

            const data = await FacturaService.getSubProductsByType(token, {
                idSucursal,
                idProductType: selectedProductType,
            });

            setProductData(prev => ({
                ...prev,
                products: data.SubProducts || []
            }));

            resetSelections();

        } catch (err) {
            setErrors(prev => ({
                ...prev,
                products: err.message || "Error al cargar los productos",
            }));
            setProductData(prev => ({ ...prev, products: [] }));
        } finally {
            setLoadingStates(prev => ({ ...prev, products: false }));
        }
    }, [selectedProductType, resetSelections]);

    // Funcion para cargar proveedores cuando cambie el producto selecionado

    const fetchSuppliers = useCallback(async (productId) => {

        if (!productId) {

            setProductData(prev => ({ ...prev, suppliers: [] }));
            return;
        }
        try {
            setLoadingStates(prev => ({ ...prev, suppliers: true }));
            setErrors(prev => ({ ...prev, suppliers: null }));

            const token = localStorage.getItem("Token");
            const idSucursal = localStorage.getItem("SucursalId");

            if (!token || !idSucursal) {
                throw new Error("Faltan credenciales necesarias");
            }

            const requestData = {
                idSucursal,
                IdSubProduct: productId
            };

            const data = await ProductosAereosService.getSupplier(token, requestData);


            setProductData(prev => ({
                ...prev,
                suppliers: data.Suppliers || []
            }));
        } catch (err) {
            setErrors(prev => ({
                ...prev,
                suppliers: err.message || "Error al cargar los proveedores",
            }));
            setProductData(prev => ({ ...prev, suppliers: [] }));
        } finally {
            setLoadingStates(prev => ({ ...prev, suppliers: false }));

        }

    }, []);

    //Funcion para selecionar el aeropuerto  nacional

    const fetchNationalAirports = useCallback(async () => {
        try {
            setLoadingStates(prev => ({ ...prev, nationalAirports: true }));
            setErrors(prev => ({ ...prev, nationalAirports: null }));

            const token = localStorage.getItem("Token");

            if (!token) {
                throw new Error("Token no encontrado");
            }

            console.log("🛫 Cargando aeropuertos nacionales...");

            const data = await ProductosAereosService.getNationalAirports(token);

            console.log("📦 Aeropuertos nacionales:", data);

            setProductData(prev => ({
                ...prev,
                nationalAirports: data.data?.Airports || []
            }));

            console.log("✅ Aeropuertos nacionales cargados exitosamente");

        } catch (error) {
            console.error("❌ Error al cargar aeropuertos nacionales:", error);
            setErrors(prev => ({
                ...prev,
                nationalAirports: error.message || "Error al cargar aeropuertos nacionales",
            }));
            setProductData(prev => ({ ...prev, nationalAirports: [] }));
        } finally {
            setLoadingStates(prev => ({ ...prev, nationalAirports: false }));
        }
    }, []);

    //Funcion para selecionar el aeropuerto  internacional

    const fetchInternationalAirports = useCallback(async () => {
        try {
            setLoadingStates(prev => ({ ...prev, internationalAirports: true }));
            setErrors(prev => ({ ...prev, internationalAirports: null }));

            const token = localStorage.getItem("Token");

            if (!token) {
                throw new Error("Token no encontrado");
            }


            const data = await ProductosAereosService.getInternationalAirports(token);


            setProductData(prev => ({
                ...prev,
                internationalAirports: data.data?.Airports || []
            }));


        } catch (error) {
            setErrors(prev => ({
                ...prev,
                internationalAirports: error.message || "Error al cargar aeropuertos internacionales",
            }));
            setProductData(prev => ({ ...prev, internationalAirports: [] }));
        } finally {
            setLoadingStates(prev => ({ ...prev, internationalAirports: false }));
        }
    }, []);

    // Función para seleccionar la clase 
    const fetchClasses = useCallback(async () => {
        try {
            setLoadingStates(prev => ({ ...prev, classes: true }));
            setErrors(prev => ({ ...prev, classes: null }));

            const token = localStorage.getItem("Token");

            if (!token) {
                throw new Error("Token no encontrado");
            }
            const data = await ProductosAereosService.getAirportClasses(token);
            console.log("📦 Clases de aeropuertos:", data);

            setProductData(prev => ({
                ...prev,
                classes: data.data?.BasicTab || []
            }));

        } catch (error) {
            setErrors(prev => ({
                ...prev,
                classes: error.message || "Error al cargar clases de aeropuertos",
            }));
            setProductData(prev => ({ ...prev, classes: [] }));
        } finally {
            setLoadingStates(prev => ({ ...prev, classes: false }));
        }

    }, []);

    // Funcion para obtener impuestos
    const fetchTaxes = useCallback(async (productType) => {

        if (!productType) {

            setProductData(prev => ({ ...prev, taxes: [] }));
            return;
        }
        try {
            setLoadingStates(prev => ({ ...prev, taxes: true }));
            setErrors(prev => ({ ...prev, taxes: null }));

            const token = localStorage.getItem("Token");

            if (!token) {
                throw new Error("Token no encontrado");
            }

            const requestData = {

                IdSubProduct: productType
            };

            const data = await ProductosAereosService.getTaxesx(token, requestData);
            console.log("📦 Impuestos de aeropuertos:", data);

            setProductData(prev => ({
                ...prev,
                taxes: data.Taxes || []


            }));

        } catch (error) {
            setErrors(prev => ({
                ...prev,
                taxes: error.message || "Error al cargar impuestos de aeropuertos",
            }));
            setProductData(prev => ({ ...prev, taxes: [] }));
        } finally {
            setLoadingStates(prev => ({ ...prev, taxes: false }));
        }

    }, []);

    //Funcion para obtener metodos de pago

    const fetchPaymentMethods = useCallback(async () => {
          try {
            setLoadingStates(prev => ({ ...prev, paymentMethods: true }));
            setErrors(prev => ({ ...prev, paymentMethods: null }));

            const token = localStorage.getItem("Token");

            if (!token) {
                throw new Error("Token no encontrado");
            }

            const data = await ProductosAereosService.getPaymentMethods(token);

            console.log("📦 Métodos de pago:", data);

            setProductData(prev => ({
                ...prev,
                paymentMethods: data.data.BasicTab || []


            }));

        } catch (error) {
            setErrors(prev => ({
                ...prev,
                paymentMethods: error.message || "Error al cargar métodos de pago",
            }));
            setProductData(prev => ({ ...prev, paymentMethods: [] }));
        } finally {
            setLoadingStates(prev => ({ ...prev, paymentMethods: false }));
        }
    }, []);


    const setSelectedProduct = useCallback((productId, idProductType) => {

        setProductData(prev => ({


            ...prev,
            selectedProductId: productId,
            selectedSubProduct: productId,
            selectedIdProduct: idProductType,
            taxes: [],
            suppliers: [] // Limpiar suppliers mientras carga


        }));
        if (productId) {  // Solo valida productId
            fetchSuppliers(productId);

            // ✅ Para taxes, validar que idProductType no sea undefined/null
            if (idProductType !== undefined && idProductType !== null) {
                fetchTaxes(idProductType);
            }
        }
    }, [fetchSuppliers, fetchTaxes]);

    const loadAirports = useCallback(async () => {
        console.log(" Cargando aeropuertos para tipo:", selectedProductType);

        if (selectedProductType === 1) {
            // Nacional
            await fetchNationalAirports();
        } else if (selectedProductType === 2) {
            // Internacional  
            await Promise.all([
                fetchNationalAirports(),      // Origen puede ser nacional
                fetchInternationalAirports(),
            ]);
        }
    }, [selectedProductType, fetchNationalAirports, fetchInternationalAirports]);



    const loadInitialData = useCallback(async () => {
        await Promise.all([
            fetchSubProducts(),
            loadAirports(),
            fetchClasses(),
            fetchPaymentMethods()


        ]);
    }, [fetchSubProducts, fetchClasses, fetchPaymentMethods]);



    return {
        // Estados
        productData,
        loadingStates,
        errors,


        // Funciones de carga

        loadInitialData,
        loadAirports,
        fetchNationalAirports,
        fetchInternationalAirports,
        fetchClasses,
        fetchTaxes,
        fetchPaymentMethods,
        // Funciones de control
        setSelectedProduct,
        resetSelections,
    };

}

