export const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}



export function formatDatePicker(date: string){
    return date;
}

export const dateFormat = {
    common: "YYYY-MM-DD",
    showTime: "YYYY-MM-DD HH:mm:SS",
}


type DeepCloneable = Record<string | number | symbol, any> | any[];
export function deepClone<T extends DeepCloneable>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }
  const objClone = {} as T;
  if (obj && typeof obj === "object") {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone(obj[key]);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}
