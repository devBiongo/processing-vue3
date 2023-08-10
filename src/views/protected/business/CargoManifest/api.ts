import http from "@/utils/request";

export const fetchCargoById = (cargoId: any) => {
  return http.post("/task/cargo/fetchOneCargo", {
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

export const updateCargo = (cargoId: any) => {
  return http.post("/task/cargo/updateCargo",cargoId)
}


