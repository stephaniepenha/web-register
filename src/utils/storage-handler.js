import stringIsJson from './string-is-json'

const appSlug = 'web-register'

export const setStorageItem = (key, value) => {
  let val = value

  if (typeof val !== 'string') {
    val = JSON.stringify(val)
  }

  window.localStorage.setItem(`${appSlug}:${key}`, val)
}

export const getStorageItem = (key) => {
  const value = window.localStorage.getItem(`${appSlug}:${key}`)
  return stringIsJson(value) ? JSON.parse(value) : value
}

export const removeStorageItem = (key) => {
  window.localStorage.removeItem(`${appSlug}:${key}`)
}

export const clearStorage = () => {
  window.localStorage.clear()
}
