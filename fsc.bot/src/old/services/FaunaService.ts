// TODO: Replace this with the public version

import faunadb from 'faunadb'
const q = faunadb.query;

class FaunaService {
  private serverClient: any;

  constructor(faunaSecret: string) {
    this.serverClient = new faunadb.Client({secret: faunaSecret})
  }

   async createRecord(collectionName: string, data: object) {
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

  async getRecordByIndex (indexName: string, value: string) {
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

  async deleteRecord (collectionName: string, recordId: number) {
    await this.serverClient.query(
      q.Delete(
        q.Ref(
          q.Collection(collectionName), 
          recordId
        )
      )
    )
  }

  async updateRecord (collectionName: string, recordId: number, updates: object) {
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

export default FaunaService