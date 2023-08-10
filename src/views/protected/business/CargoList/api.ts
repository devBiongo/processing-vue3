import http from "@/utils/request";

export const fetchCargos = (fields?: any[]) => {
  if (fields === undefined) fields = [];
  return http.post("/task/cargo/fetchCargos", {
    orderField: "createdAt",
    asc: false,
    fields: [
      {
        name: "del_flag",
        value: 0,
        queryMethod: "eq",
      },
      ...fields,
    ],
  });
};

export const addOneCargo = (formObj: any) => {
  return http.post("/task/cargo/addOneCargo", formObj);
};

export const downloadPdf = (cargoId: string) => {
  const queries = [
    {
      name: "cargoId",
      value: cargoId,
      queryMethod: "eq",
    },
  ];
  fetchCargos(queries).then((data: any) => {
    return http.post(`/file/pdf/download`, data[0], {
      responseType: "arraybuffer",
    });
  });
};
