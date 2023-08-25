import { HandlerEvent, HandlerContext } from "@netlify/functions";
import { spaces, users } from "./db/schema";
import { eq } from "drizzle-orm";
import { getDb } from "./db/db";


const handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { spaceId } = event.queryStringParameters as any
  if(spaceId) {
    const db = getDb();
    const space = await db.query.spaces.findFirst({
      where: eq(spaces.id, parseInt(spaceId))
    })
    if(space) {
      return {
        statusCode: 200,
        body: JSON.stringify(space)
      }
    } else {
      return {
        statusCode: 404
      }
    }

  } else {
    return { 
      statusCode: 404
    }
  }
};

export { handler };