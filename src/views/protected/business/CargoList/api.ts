import http from "@/utils/request";

export const fetchCargos = () => {
    return http.get("/task/cargo/fetchCargosDistinct");
}

export const addOneCargo = (formObj: any) => {
    return http.post("/task/cargo/addOneCargo", formObj)
}