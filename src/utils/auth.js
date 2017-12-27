const AUTH_TOKEN_ITEM = 'authToken'

export const saveToken = token => {
  return window.localStorage.setItem(AUTH_TOKEN_ITEM, token)
}

export const getToken = () => {
  return window.localStorage.getItem(AUTH_TOKEN_ITEM)
}

export const clearToken = () => {
  return window.localStorage.removeItem(AUTH_TOKEN_ITEM)
}
