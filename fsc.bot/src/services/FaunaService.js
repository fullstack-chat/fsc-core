const faunadb = require('faunadb')
const q = faunadb.query;

module.exports = class FaunaService {
  constructor(faunaSecret) {
    this.serverClient = new faunadb.Client({secret: faunaSecret})
  }

  createRecord = async function (collectionName, data) {
    let record = await this.serverClient.query(
      q.Create(
        q.Collection(collectionName),
        { data }
      )
    )
    let recordData = record.data
    recordData.id = record.ref.id
    return recordData
  }

  getRecordByIndex = async function (indexName, value) {
    try {
      let record = await this.serverClient.query(
        q.Get(
          q.Match(
            q.Index(indexName),
            value
          )
        )
      )
      let recordData = record.data
      recordData.id = record.ref.id
      return recordData
    } catch (err) {
      console.error('FaunaService.getRecordByIndex:', err.toString())
    }
  }

  deleteRecord = async function(collectionName, recordId) {
    await this.serverClient.query(
      q.Delete(
        q.Ref(
          q.Collection(collectionName), 
          recordId
        )
      )
    )
  }

  updateRecord = async function (collectionName, recordId, updates) {
    try {
      let updated = await this.serverClient.query(
        q.Update(
          q.Ref(
            q.Collection(collectionName), 
            recordId,
          ),
          {
            data: updates
          }
        )
      )
      let recordData = updated.data
      recordData.id = updated.ref.id
      return recordData
    } catch (err) {
      console.error('FaunaService.updateRecord:', err.toString())
    }
  }
}