import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setItem = (name: string, value: string, day: number) => {
  const today = new Date();
  const expires = new Date();
  expires.setDate(today.getDate() + day);
  cookies.set(name, value, { path: "/", expires });
};

export const getItem = (name: string) => {
  const value = cookies.get(name);
  return value ? value : "";
};

export const removeItem = (name: string) => {
  return cookies.remove(name);
};

export default cookies;
