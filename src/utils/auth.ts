import { setItem, getItem, removeItem } from "./cookie";

const TokenKey = "Access-Token";

export function getToken() {
  return getItem(TokenKey);
}

export function setToken(token: string) {
  return setItem(TokenKey, token, 1);
}

export function removeToken() {
  return removeItem(TokenKey);
}
