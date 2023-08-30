import { navigate } from 'gatsby'
import React, { useEffect } from 'react'
import Loading from '../components/Loading'

function Login() {
  useEffect(() => {
    // @ts-ignore
    window.location.href = process.env.GATSBY_DISCORD_LOGIN_URL
  }, [])

  return (
    <Loading />
  )
}

export default Login