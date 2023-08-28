const key = process.env.API_KEY

exports.isAuthorized = function (event) {
  let result = false;
  if(event.headers && event.headers.authorization && event.headers.authorization === key) {
    result = true;
  }

  if(event.headers && event.headers.Authorization && event.headers.Authorization === key) {
    result = true;
  }

  if(event.queryStringParameters && event.queryStringParameters.key === key) {
    result = true;
  }

  return result;
}