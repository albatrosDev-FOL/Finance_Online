export const invoiceColumns = [
  { name: "Origen", selector: (row) => row.origen, sortable: true },
  { name: "Destino", selector: (row) => row.destino, sortable: true },
  { name: "Clases", selector: (row) => row.clases, sortable: true },
  { name: "Fecha", selector: (row) => row.fecha, sortable: true },
  { name: "Número de Vuelo", selector: (row) => row.numeroVuelo, sortable: true },
];
 
 export const invoiceColumnsTax = [
    { name: "Impuesto", selector: (row) => row.impuesto, sortable: true },
    { name: "Valor", selector: (row) => row.valor, sortable: true },
  ];

  export const invoiceColumnsPay = [
    { name: "Forma de Pago", selector: (row) => row.formaPago, sortable: true },
    { name: "Valor", selector: (row) => row.valor, sortable: true },
    

  ]