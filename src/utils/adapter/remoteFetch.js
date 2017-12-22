import 'whatwg-fetch'

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
        'Authorization': 'Token 77d86217bd4da00190c9cd1a00520ed4393b1728'
      }
    }

    const config = Object.assign({}, baseConfig, data)
    return fetch(URL, config)
    .then(function (response) {
      return response.text()
    })
    .then(data => {
      return JSON.parse(data)
    })
  }

  authenticate (username, password) {
    this.fetch('/auth/authenticate', {
      method: 'POST',
      body: {
        username: username,
        password: password
      }
    })
  }
}
