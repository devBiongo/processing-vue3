import http from "@/utils/request";

export const fetchCargoById = (cargoId: any) => {
  return http.post("/task/cargo/fetchCargos", {
    orderField: "subNo",
    asc: false,
    fields: [
      {
        name: "del_flag",
        value: 0,
        queryMethod: "eq",
      },
      {
        name: "cargoId",
        value: cargoId,
        queryMethod: "eq",
      },
    ],
  });
};
