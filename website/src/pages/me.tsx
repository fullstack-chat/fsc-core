import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import Layout from '../layout'
import Loading from '../components/Loading'
import Checkbox from '../components/Checkbox'
import { FaSave } from 'react-icons/fa'

function Me() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [username, setUsername] = useState("")
  const [img_url, setImgUrl] = useState("")
  const [is_public, setIsPublic] = useState(false)
  const [xp, setXp] = useState(0)

  // Fields
  const [tagline, setTagline] = useState("")
  const [website_url, setWebsite] = useState("")
  const [twitter_url, setTwitter] = useState("")
  const [facebook_url, setFacebook] = useState("")
  const [instagram_url, setInstagram] = useState("")
  const [twitch_url, setTwitch] = useState("")
  const [threads_url, setThreads] = useState("")

  useEffect(() => {
    async function init() {
      let res = await fetch("/.netlify/functions/me")
      let json = await res.json()
      setUsername(json.username)
      setXp(json.userXp.current_xp)
      setImgUrl(json.img_url)
      setIsPublic(json.is_public)
      setTagline(json.tagline)
      setWebsite(json.website_url)
      setTwitter(json.twitter_url)
      setFacebook(json.facebook_url)
      setInstagram(json.instagram_url)
      setTwitch(json.twitch_url)
      setThreads(json.threads_url)
      setIsLoaded(true)
    }
    init()
  }, [])

  async function save() {
    const body = {
      tagline,
      website_url,
      twitter_url,
      facebook_url,
      instagram_url,
      twitch_url,
      threads_url,
      is_public
    }
    const res = await fetch("/.netlify/functions/me", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
  }

  return (
    <Layout>
      {!isLoaded ? <Loading /> : (
        <>
          <div className="flex gap-4 rounded-xl shadow-lg bg-[#1e212a] border border-[#282b34] p-6 mb-4">
            {img_url && (
              <div className="">
                <img src={img_url} alt={`${username}'s profile image`} className="rounded-full shadow-lg border border-[#282b34] max-w-[100px]" />
              </div>
            )}
            <div className="flex flex-1 flex-col">
              <h2>@{ username }</h2>
              <span>{ xp }xp</span>
            </div>
            <div className="">

            <button onClick={() => save()} className="flex items-center bg-blue-600 hover:bg-blue-500 hover:shadow-lg rounded-lg shadow text-center text-white text-base font-semibold w-full p-3 transition-all">
              <FaSave /> <span className="hidden md:block ml-2">Save</span>
            </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl shadow-lg bg-[#1e212a] border border-[#282b34] p-6 mb-4">
            <h3>General info</h3>
            <div className="grid gap-4">
              <Input 
                label="Tagline" 
                placeholder="A one liner about you!"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)} />
              <Checkbox 
                label="Show public profile"
                checked={is_public}
                onChange={(e) => setIsPublic(e.target.checked)} />
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl shadow-lg bg-[#1e212a] border border-[#282b34] p-6 mb-4">
            <h3>Socials</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Input label="Website" value={website_url} onChange={(e) => setWebsite(e.target.value)} />
              <Input label="Twitter" value={twitter_url} onChange={(e) => setTwitter(e.target.value)}/>
              <Input label="Facebook" value={facebook_url} onChange={(e) => setFacebook(e.target.value)}/>
              <Input label="Instagram" value={instagram_url} onChange={(e) => setInstagram(e.target.value)}/>
              <Input label="Twitch" value={twitch_url} onChange={(e) => setTwitch(e.target.value)}/>
              <Input label="Threads" value={threads_url} onChange={(e) => setThreads(e.target.value)}/>
            </div>
          </div>
          {/* <div className="flex flex-col gap-4 rounded-xl shadow-lg bg-[#1e212a] border border-[#282b34] p-6 mb-4">
            <h3>Ping roles</h3>
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
              <Checkbox label="@accountability-ping" />
              <Checkbox label="@book-club-ping" />
              <Checkbox label="@mastermind-ping" />
            </div>
          </div> */}
        </>
      )}
    </Layout>
  )
}

export default Me