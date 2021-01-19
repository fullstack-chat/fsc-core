import { IDatastoreAdapter } from "@victorbotjs/core";
// @ts-ignore
import FaunaService from '@brianmmdev/faunaservice';

class FaunaDatastoreAdapter implements IDatastoreAdapter {
  identifier: string = 'Fauna';
  
  _faunaService: any;
  _faunaSecret: string;
  _indexName: string;
  _collectionName: string;

  constructor(faunaSecret: string, indexName: string, collectionName: string) {
    this._indexName = indexName;
    this._collectionName = collectionName;
    this._faunaSecret = faunaSecret;
  }

  async init() {
    this._faunaService = new FaunaService(this._faunaSecret);
  }

  async save(identifier: string, data: any) {
    await this._faunaService.updateRecord(this._collectionName, identifier, {
      document: data
    })
  }

  async fetch(identifier: string) {
    return await this._faunaService.getRecordByIndex(this._indexName, identifier);
  }
}

export default FaunaDatastoreAdapter