import { HandlerContext, HandlerEvent } from "@netlify/functions";
import { validateAuth } from './utils/auth'
import { getDb } from "./db/db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

exports.handler = async (event: HandlerEvent, context: HandlerContext) => {
  let auth = await validateAuth(event)
  if(!auth.isAuthorized) {
    return {
      statusCode: 401
    }
  }

  try {
    const db = getDb();
    const userIdBigInt = BigInt(auth.userId as string)
    let userData = await db.query.users.findFirst({
      where: eq(users.id, userIdBigInt),
      with: {
        userXp: true
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(userData, (_, value) => typeof value === 'bigint' ? value.toString() + 'n' : value)
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500
    }
  }
}