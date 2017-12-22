export default class LocalStorageAdapter {
  constructor () {
    this.engine = window.localStorage
  }

  find (entityType, query) {
    return JSON.parse(this.engine.getItem(this.getEntityNameSpace(entityType)))
  }

  retrieveById (entityType, entityId) {
    return JSON.parse(this.engine.getItem(this.getEntityNameSpace(entityType) + entityId))
  }

  update (entityType, entityData) {
    this.engine.setItem(this.getEntityNameSpace(entityType) + entityData.entityId, JSON.stringify(entityData))
  }

  remove (entityType, entityId) {
    this.engine.removeItem(this.getEntityNameSpace(entityType) + entityId)
  }

  insert (entityType, entityData) {
    this.engine.setItem(this.getEntityNameSpace(entityType) + new Date().getTime(), JSON.stringify(entityData))
  }

  getEntityNameSpace (entity) {
    return `ENTITY_${entity}`
  }
}
