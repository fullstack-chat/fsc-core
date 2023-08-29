import { HandlerContext, HandlerEvent } from "@netlify/functions";
import { ValidateAuthResults, validateAuth } from './utils/auth'
import { getDb } from "./db/db";
import { users } from "./db/schema";
import { eq, sql } from "drizzle-orm";

exports.handler = async (event: HandlerEvent, context: HandlerContext) => {
  let auth = await validateAuth(event)
  if(!auth.isAuthorized) {
    return {
      statusCode: 401
    }
  }

  if(event.httpMethod === "GET") {
    return await get(event, context, auth)
  }

  if(event.httpMethod === "POST") {
    return await post(event, context, auth)
  }

  return {
    statusCode: 404
  }
}

async function get(event: HandlerEvent, context: HandlerContext, auth: ValidateAuthResults) {
  try {
    const db = getDb();
    const userIdBigInt = BigInt(auth.userId as string)
    let userData = await db.query.users.findFirst({
      where: eq(users.id, userIdBigInt),
      with: {
        userXp: true
      }
    });

    // Get this directly from discord
    if(userData) {
      userData.username = auth.username as string
      userData.img_url = auth.img_url as string
    }

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

async function post(event: HandlerEvent, context: HandlerContext, auth: ValidateAuthResults) {
  try {
    if(!event.body) {
      return {
        statusCode: 400
      }
    }

    const body = JSON.parse(event.body);

    console.log(body)

    const db = getDb();
    await db.execute(sql`insert into users( 
      id, 
      username,
      tagline, 
      img_url,
      website_url,
      twitter_url,
      facebook_url,
      instagram_url,
      twitch_url,
      threads_url,
      is_public
    ) VALUES (
      ${BigInt(auth.userId as string)},
      ${auth.username},
      ${body.tagline},
      ${auth.img_url},
      ${body.website_url},
      ${body.twitter_url},
      ${body.facebook_url},
      ${body.instagram_url},
      ${body.twitch_url},
      ${body.threads_url},
      ${body.is_public}
    ) ON DUPLICATE KEY UPDATE
      username = ${auth.username}, 
      tagline = ${body.tagline},
      img_url = ${auth.img_url},
      website_url = ${body.website_url},
      twitter_url = ${body.twitter_url},
      facebook_url = ${body.facebook_url},
      instagram_url = ${body.instagram_url},
      twitch_url = ${body.twitch_url},
      threads_url = ${body.threads_url},
      is_public = ${body.is_public}
    ;`);

    return {
      statusCode: 200
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500
    }
  }
}