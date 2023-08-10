const mapDataToTreeNodes = (data: any, category: string) => {
  return data[category].map((s: any) => ({
    title: s.companyName,
    key: s.id,
  }));
};
export const formatTreeData = (data: any) => [
  {
    title: "シーパー",
    key: "shipper",
    children: mapDataToTreeNodes(data, "shipper"),
  },
  {
    title: "货代",
    key: "agency",
    children: mapDataToTreeNodes(data, "agency"),
  },
  {
    title: "拖车",
    key: "trailer",
    children: mapDataToTreeNodes(data, "trailer"),
  },
  {
    title: "船运",
    key: "ship",
    children: mapDataToTreeNodes(data, "ship"),
  },
  {
    title: "海关",
    key: "customs",
    children: mapDataToTreeNodes(data, "customs"),
  },
];

export const formatSelectItems = (data: any) =>
  [
    ...data.trailer,
    ...data.ship,
    ...data.shipper,
    ...data.customs,
    ...data.agency,
  ].map((s: any) => ({
    key: s.id,
    value: s.companyName,
  }));

export const getColumn = () => {
  return [
    {
      title: "ニックネーム",
      dataIndex: "nickname",
      key: "nickname",
      width: "16%",
    },
    {
      title: "アカウント",
      dataIndex: "username",
      key: "username",
      width: "10%",
    },
    {
      title: "ステータス",
      dataIndex: "status",
      key: "status",
      width: "12%",
    },
    {
      title: "電話番号",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "12%",
    },
    {
      title: "メール",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "登録時間",
      dataIndex: "createTime",
      key: "createdTime",
      sorter: true,
      width: "12%",
    },
    {
      title: "アクション",
      dataIndex: "actions",
      key: "actions",
    },
  ];
};
