import { HandlerContext, HandlerEvent } from "@netlify/functions"
import { ValidateAuthResults, validateAuth } from "./auth"

export interface HandlerEventWithAuth extends HandlerEvent {
  auth: ValidateAuthResults
}

const NotFoundResponse = {
  statusCode: 404
}

export default class NetlifyRouter {
  authRequired: boolean = false
  get?: (event: HandlerEventWithAuth, context: HandlerContext) => Promise<any>
  post?: (event: HandlerEventWithAuth, context: HandlerContext) => Promise<any>
  put?: (event: HandlerEventWithAuth, context: HandlerContext) => Promise<any>
  del?: (event: HandlerEventWithAuth, context: HandlerContext) => Promise<any>

  async handle(event: HandlerEvent, context: HandlerContext): Promise<any> {
    if(this.authRequired) {
      let auth = await validateAuth(event)
      if(!auth.isAuthorized) {
        return {
          statusCode: 401
        }
      }
    }

    const fnmap: {[key: string]: any} = {
      "GET": this.get,
      "POST": this.post,
      "PUT": this.put,
      "DELETE": this.del
    }

    if(fnmap[event.httpMethod]) {
      return await fnmap[event.httpMethod]
    } else {
      return NotFoundResponse
    }
  }
}