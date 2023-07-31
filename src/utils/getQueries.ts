/**
 * フォーマット
 * @param params
 * @returns
 */

type queries = {
  pageIndex: number;
  pageSize: number;
  orderField: string;
  asc: boolean;
  fields: { name: string; value: any; queryMethod: string }[];
};
export function getQueries(): queries {
  return {
    pageIndex: 1,
    pageSize: 10,
    orderField: "",
    asc: false,
    fields: [getField("del_flag",0)],
  };
}

export function getField(name: string, value: any, queryMethod?: string) {
  return {
    name,
    value,
    queryMethod: queryMethod !== undefined ? queryMethod : "eq",
  };
}
