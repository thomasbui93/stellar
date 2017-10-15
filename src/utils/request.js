import fetch from 'isomorphic-fetch'
import {getStorage} from './storage'
import queryString from 'query-string'

const headers = {
  'Content-Type': 'application/json',
  'jwt-access-token': getStorage('access-token')
}

export const post = (URL, data) => {
  URL = `/api/v1/${URL}`
  return fetch(URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status > 400) {
      throw new Error(`Unexpected happened ${response.statusText}`)
    } else {
      return response.json()
    }
  })
}

export const get = (URL, params) => {
  const query = composeQuery(params)
  URL = query ? `/api/v1/${URL}?${composeQuery(params)}` : `/api/v1/${URL}`
  return fetch(URL, {
    method: 'GET',
    headers: headers
  }).then(response => {
    if (response.status > 400) {
      throw new Error(`Unexpected happened ${response.statusText}`)
    } else {
      return response.json()
    }
  })
}

export const del = (URL) => {
  URL = `/api/v1/${URL}`
  return fetch(URL, {
    method: 'DELETE'
  }).then(response => {
    if (response.status > 400) {
      throw new Error(`Unexpected happened ${response.statusText}`)
    } else {
      return response.json()
    }
  })
}

export const composeQuery = params => {
  if (!params) return ''
  return Object
    .keys(params)
    .map(k => {
      if (Array.isArray(params[k])) {
        return params[k]
          .map(val => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
          .join('&')
      }

      return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
    })
    .join('&')
}

export const parseQuery = query => {
  return queryString.parse(query)
}
