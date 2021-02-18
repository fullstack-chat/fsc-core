<template>
  <div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async mounted() {
    // get the code from ?code="code"
    let code = window.location.search.replace("?code=", "")

    // post to /.netlify/functions/code
    // TODO: Get this working without url
    let opts = {
      url: `${process.env.GRIDSOME_API_URL}/code`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        code
      }
    }
    console.log(opts)
    let response = await axios(opts)
    console.log(response)

    // Save access_token to localstorage
    if(response.data && response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token)
    }

    // Redirect to /me
    // TODO: Fix this and dont use the url
    window.location = `${window.location.origin}/me`
  }
}
</script>

<style>

</style>