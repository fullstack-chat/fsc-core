import { navigate } from 'gatsby'
import React, { useEffect } from 'react'

type TokenResponse = {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
}

// function setCookie(name,value,days) {
//   var expires = "";
//   if (days) {
//       var date = new Date();
//       date.setTime(date.getTime() + (days*24*60*60*1000));
//       expires = "; expires=" + date.toUTCString();
//   }
//   document.cookie = name + "=" + (value || "")  + expires + "; path=/";
// }
// function getCookie(name) {
//   var nameEQ = name + "=";
//   var ca = document.cookie.split(';');
//   for(var i=0;i < ca.length;i++) {
//       var c = ca[i];
//       while (c.charAt(0)==' ') c = c.substring(1,c.length);
//       if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//   }
//   return null;
// }
// function eraseCookie(name) {   
//   document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
// }

function OAuthHandler() {
  useEffect(() => {
    async function handleCode() {
      let { search } = window.location
      search = search.replace("?", "")
      let query: {[key: string]: string} = {}
      search.split("&").forEach(el => {
        let split = el.split("=")
        // @ts-ignore
        query[split[0]] = split[1]
      })

      let res = await fetch(`/.netlify/functions/code`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code: query["code"]
        })
      })
      let json = await res.json() as TokenResponse
      let expiry = new Date()
      expiry.setTime(Date.now() + (json.expires_in * 1000))
      document.cookie = `discord_token=${json.access_token};expires=${expiry.toUTCString()}; path=/`

      // let nextState = localStorage.getItem("nextState")
      // if(nextState && !nextState.startsWith("/oauth")) {
      //   nextState = decodeURIComponent(nextState)
      //   localStorage.removeItem("nextState")
      //   navigate(nextState)
      // } else {
      //   navigate("/")
      // }
    }

    try {
      handleCode()
    } catch (err) {
      console.error(err)
      navigate("/")
    }
  }, [])

  return (
    <div>OAuthHandler</div>
  )
}

export default OAuthHandler