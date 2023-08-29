import { HandlerEvent } from "@netlify/functions"

export type ValidateAuthResults = {
  isAuthorized?: boolean
  isMod?: boolean
  userId?: string
}

function parseCookies(event: HandlerEvent): {[key: string]: string} {
  let cookies: {[key: string]: string} = {}
  if(event.headers && event.headers.cookie) {
    let spl1 = event.headers.cookie.split(";")
    spl1.forEach(el => {
      let spl2 = el.split("=")
      cookies[spl2[0].trim()] = spl2[1]
    })
  }
  return cookies
}

export async function validateAuth(event: HandlerEvent): Promise<ValidateAuthResults> {
  const results: ValidateAuthResults  = {
    isAuthorized: false,
    isMod: false
  }
  try {
    let cookies = parseCookies(event)
    if(cookies["discord_token"]) {
      let res = await fetch('https://discord.com/api/users/@me', {
        method: 'get',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${cookies["discord_token"]}`
        }
      });
      let json = await res.json();
      results.userId = json.id
      results.isAuthorized = true
    }
  } catch (err) {
    console.error(err)
  }
  return results;
}