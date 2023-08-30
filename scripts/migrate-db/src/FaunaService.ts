import * as faunadb from 'faunadb'
const q = faunadb.query;

export default class FaunaService {
  serverClient: any

  constructor(faunaSecret: any) {
    this.serverClient = new faunadb.Client({secret: faunaSecret})
  }

  async createRecord(collectionName: any, data:any) {
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

  async getRecordByIndex(indexName: any, value: any) {
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
    } catch (err: any) {
      console.error('FaunaService.getRecordByIndex:', err.toString())
    }
  }

  async deleteRecord(collectionName: any, recordId: any) {
    await this.serverClient.query(
      q.Delete(
        q.Ref(
          q.Collection(collectionName),
          recordId
        )
      )
    )
  }

  async updateRecord(collectionName: any, recordId: any, updates: any) {
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
    } catch (err: any) {
      console.error('FaunaService.updateRecord:', err.toString())
    }
  }
}