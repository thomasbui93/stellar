import RemoteFetch from './adapter/remoteFetch'

export class NoteRepository {
  adapter;

  constructor (adapter) {
    this.adapter = adapter
  }

  async retrieveList (query) {
    return this.adapter.find('note', query)
  }

  async retrieveById (noteId) {
    return this.adapter.retrieveById('note', noteId)
  }

  async update (note) {
    return this.adapter.update('note', note)
  }

  async remove (noteId) {
    return this.adapter.remove('note', noteId)
  }

  async insert (noteItem) {
    return this.adapter.insert('note', noteItem)
  }
}

export default new NoteRepository(new RemoteFetch())
