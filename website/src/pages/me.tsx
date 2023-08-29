import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import Layout from '../layout'
import Loading from '../components/Loading'
import Checkbox from '../components/Checkbox'

function Me() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [username, setUsername] = useState("")
  const [xp, setXp] = useState(0)

  useEffect(() => {
    async function init() {
      let res = await fetch("/.netlify/functions/me")
      let json = await res.json()
      setUsername(json.username)
      setXp(json.userXp.current_xp)
      setIsLoaded(true)
    }
    init()
  }, [])

  return (
    <Layout>
      {!isLoaded ? <Loading /> : (
        <>
          <div className="flex gap-4 rounded-xl shadow-lg bg-[#1e212a] border border-[#282b34] p-6 mb-4">
            <div className="">
              {/* TODO: image */}
            </div>
            <div className="flex flex-col">
              <h2>@{ username }</h2>
              <span>{ xp }xp</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl shadow-lg bg-[#1e212a] border border-[#282b34] p-6 mb-4">
            <h3>General info</h3>
            <div className="grid gap-4">
              <Input label="Tagline" placeholder="A one liner about you!" />
              <Checkbox label="Show public profile" />
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl shadow-lg bg-[#1e212a] border border-[#282b34] p-6 mb-4">
            <h3>Socials</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Input label="Website" />
              <Input label="Twitter" placeholder="It's still not 'X'" />
              <Input label="Facebook" />
              <Input label="Instagram" />
              <Input label="Twitch" />
              <Input label="Threads" />
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl shadow-lg bg-[#1e212a] border border-[#282b34] p-6 mb-4">
            <h3>Ping roles</h3>
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
              <Checkbox label="@accountability-ping" />
              <Checkbox label="@book-club-ping" />
              <Checkbox label="@mastermind-ping" />
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}

export default Me