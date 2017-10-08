const isSupportedLS = () => {
  return typeof window.localStorage !== 'undefined'
}

const genericStorage = (key, value) => {
  const isGetMode = typeof value === 'undefined'
  if (isSupportedLS()) {
    return isGetMode ? window.localStorage.getItem(key) : window.localStorage.setItem(key, value)
  } else {
    console.log('Localstorage is not supported.')
    return false
  }
}

export const getStorage = (key) => {
  let localData = genericStorage(key)
  if (!localData) return undefined
  try {
    localData = JSON.parse(localData)
    const currentTime = new Date()
    return (!localData.expiredTime || localData.expiredTime < currentTime.getTime()) ? undefined : localData.data
  } catch (err) {
    return undefined
  }
}

export const setStorage = (key, value, expiredTime = 1000 * 60 * 60 * 24) => {
  const localData = {data: value, expiredTime: expiredTime}
  return genericStorage(key, JSON.stringify(localData))
}
