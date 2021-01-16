
const azure = require('azure-storage');

let tableSvc;

exports.init = async function () {
  tableSvc = azure.createTableService(process.env.CONNECTION_STRING);
}

exports.fetch = async function (rowKey, initData)  {
  return new Promise((resolve, reject) => {
    tableSvc.retrieveEntity(process.env.TABLE_NAME, process.env.GUILD_ID, rowKey, function(error, result, response){
      if(error){
        if(error.statusCode === 404) {
          if(!initData) {
            initData = ''
          }
          resolve(initData)
        } else {
          reject(error)
        }
      } else {
        try {
          let returnData = JSON.parse(result.Data['_'])
          resolve(returnData)
        } catch {
          resolve(result.Data['_'])
        }
      }
    });
  })
}

exports.save = async function (rowKey, data) {
  return new Promise((resolve, reject) => {
    if(data.constructor === {}.constructor) {
      data = JSON.stringify(data)
    }
    let record = {
      PartitionKey: process.env.GUILD_ID,
      RowKey: {
        "_": rowKey
      },
      Data: data
    }
    tableSvc.insertOrReplaceEntity(process.env.TABLE_NAME, record, function(error){
      if(error) {
        reject(error)
      } else {
        resolve();
      }
    });
  })
}