import http from "@/utils/request";

export const fetchUsers = (queries?: any) => {
  if(queries===undefined) queries = {}; 
  queries['del_flag'] = 0;
  return http.post("/system/fetchUsers",{queries});
};

export const fetchAllCompanies = () => {
  return http.get("/system/fetchAllCompanies");
};

export const addUser = (params: any) => {
  return http.post("/system/addUser",params);
}

export const updateUser = (params: any) => {
  return http.post("/system/updateUser",params);
}

export const deleteUser = (params: any) => {
  return http.post("/system/deleteUser",params);
}

export const setUserStatus = (params: any) => {
  return http.post("/system/setUserStatus",params);
}

