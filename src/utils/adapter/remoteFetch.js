import 'whatwg-fetch'
import { getToken } from '../auth';

export default class RemoteFetch {
  find (entityType, query) {
    return this.fetch(`/api/v1/${this.getEntityNameSpace(entityType)}/`)
  }

  retrieveById (entityType, entityId, query) {
    return this.fetch(`/api/v1/${this.getEntityNameSpace(entityType)}/${entityId}${query ? '/' + query : ''}`)
  }

  update (entityType, entityData) {
    return this.fetch(`/api/v1/${this.getEntityNameSpace(entityType)}/${entityData.key}`, {
      method: 'PUT',
      body: JSON.stringify(entityData)
    })
  }

  remove (entityType, entityId) {
    return this.fetch(`/api/v1/${this.getEntityNameSpace(entityType)}/${entityId}`, {
      method: 'DELETE'
    })
  }

  insert (entityType, entityData) {
    return this.fetch(`/api/v1/${this.getEntityNameSpace(entityType)}/`, {
      method: 'POST',
      body: JSON.stringify(entityData)
    })
  }

  getEntityNameSpace (entity) {
    const entityMapper = {
      'category': 'notebooks',
      'note': 'notes',
      'tag': 'tags'
    }
    return entityMapper[entity]
  }

  fetch (URL, data) {
    const baseConfig = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${getToken()}`
      }
    }

    const config = Object.assign({}, baseConfig, data)
    return fetch(URL, config)
    .then(function (response) {
      if(!response.ok) {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText
        })
      }
      return response.json()
    })
  }

  authenticate (username, password) {
    return window.fetch('/auth/authenticate', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => {
      if(!response.ok) {
        return Promise.reject(response.statusText)
      }
      return response.json()
    })
  }
}
