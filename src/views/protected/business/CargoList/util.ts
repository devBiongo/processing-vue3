const columns = [
  {
    title: "請求書番号",
    dataIndex: "invoiceNo",
    key: "invoiceNo",
    customFilterDropdown: true,
    onFilter: (value: any, record: any) =>
    record.invoiceNo?record.invoiceNo.toString().toLowerCase().includes(value.toLowerCase()):false,
  },
  {
    title: "BOOKING NO",
    dataIndex: "bookingNo",
    key: "bookingNo",
  },

  {
    title: "SHIPPING COMP",
    dataIndex: "shippingCompanyName",
    key: "shippingCompanyName",
  },
  {
    title: "運輸会社",
    dataIndex: "transportationCompany",
    key: "transportationCompany",
    customFilterDropdown: true,
    onFilter: (value: any, record: any) =>
    record.invoiceNo?record.transportationCompany.toString().toLowerCase().includes(value.toLowerCase()):false,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
  },
];

export function useColumn() {
  return columns;
}
