// config/tableColumns.js
export const invoiceColumns = [
  {
    name: "Número Factura",
    selector: row => row.InvoiceNumber,
    sortable: true,
    width: "153px",
  },
  {
    name: "Cliente",
    selector: row => row.CustomerName,
    sortable: true,
    width: "293px",
  },
  {
    name: "Fecha Expedición",
    selector: row => row.InvoiceDate,
    sortable: true,
    width: "163px",
  },
  {
    name: "Vencimiento",
    selector: row => row.InvoiceDateExp,
    sortable: true,
    width: "163px",
  },
  {
    name: "Moneda",
    selector: row => row.Coin,
    sortable: true,
    width: "100px",
  },
  {
    name: "Valor",
    selector: row => row.TotalValue,
    sortable: true,
    width: "100px",
  },
  {
    name: "Estado",
    selector: row => row.State,
    sortable: true,
    width: "100px",
  },
  {
    name: "Sucursal",
    selector: () => localStorage.getItem("Agencia"),
    sortable: true,
    width: "200px",
  },
  {
    name: "Tipo",
    selector: row => row.Type,
    sortable: true,
    width: "100px",
  },
];