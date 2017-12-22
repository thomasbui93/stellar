export default class CategoryRepository {
  adapter;

  constructor (adapter) {
    this.adapter = adapter
  }

  async retrieveList (query) {
    return this.adapter.find('category', query)
  }

  async retrieveById (categoryId, query) {
    return this.adapter.retrieveById('category', categoryId, query)
  }

  async update (category) {
    return this.adapter.update('category', category)
  }

  async remove (categoryId) {
    return this.adapter.remove('category', categoryId)
  }

  async insert (categoryItem) {
    return this.adapter.insert('category', categoryItem)
  }
}
