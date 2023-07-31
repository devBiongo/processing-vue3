const columns = [
    {
      title: "請求書番号",
      dataIndex: "invoiceNo",
      key: "invoiceNo",
    },
    {
      title: "ステータス",
      dataIndex: "status",
      key: "status",
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
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
    },
  ];

export function getColumn(){
    return columns;
}