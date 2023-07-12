import SessionUtil from '@/utils/SessionUtil'

const TokenKey = "Access-Token";

export function getToken() {
  return SessionUtil.get(TokenKey);
}

export function setToken(token: string) {
  return SessionUtil.set(TokenKey, token);
}

export function removeToken() {
  return SessionUtil.remove(TokenKey);
}
