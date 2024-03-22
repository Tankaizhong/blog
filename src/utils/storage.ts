/**
 * 读取本地存储
 * @param {String} key
 */
export const getStorage = (key) => {
  const value = localStorage.getItem(key)
  if (!value) return null
  return value.indexOf('{') === 0 || value.indexOf('[') === 0 ? JSON.parse(value) : value
}

/**
 * 本地存储
 * @param {String} key
 * @param {any} value
 */
export const saveStorage  = (key, value) => {
  const data = typeof value === 'object' ? JSON.stringify(value) : value
  localStorage.setItem(key, data)
}

/**
 * 删除本地存储
 * @param {String} key
 */
export const removeStorage  = (key) => {
  localStorage.removeItem(key)
}

export const clearStorage  = () => {
  localStorage.clear()
}
