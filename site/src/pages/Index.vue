<template>
  <Layout hideLogo>
    <div class="container mx-auto px-20 h-screen flex justify-center items-center">
      <div class="w-4/12" >
        <!-- Shown on small screens -->
        <g-image alt="fullstack.chat logo" src="/assets/images/logo-2.png" class="logo mx-auto" />
        <!-- Shown on large creens -->
        <!-- <g-image alt="fullstack.chat logo" src="/assets/images/logo-2.png" class="logo img-fluid d-none d-lg-block" /> -->
      </div>
      <div class="w-8/12">
        <h1>👋 Welcome to fullstack.chat!</h1>
        <div class="welcome-text">
          We are a welcome and opening community of developers of all skillsets and experience levels. Scoll down to see what our community is all about!
        </div>
      </div>
    </div>

    <!-- Info Section -->
    <div class="container mx-auto px-20 h-96 flex justify-center items-center">
      <div class="w-9/12">
        <h3 class="section-header">😊 A Friendly Place for Experts & Beginners!</h3>
        <div class="welcome-text">
          Whether you're a seasoned expert or just getting started, fullstack.chat is a safe place to ask questions and grow as a developer. There's no such thing as a dumb question with us.
        </div>
      </div>
      <div class="w-3/12">
        <ChatBubble username="noobmaster70" imgPath="avatars/1.png">
          Look at this cool thing I did!
        </ChatBubble>
        <ChatBubble username="cryptarchR" imgPath="avatars/2.png">
          Wow thats awesome! Great job 😀
        </ChatBubble>
        <ChatBubble username="wwwion_d1" imgPath="avatars/3.png">
          How exactly does this work? So cool...
        </ChatBubble>
      </div>
    </div>

    <div class="container mx-auto px-20 h-96 flex justify-center items-center">
      <div class="w-4/12" >
        <BotImage animate/>
      </div>
      <div class="w-8/12">
        <h3 class="section-header">🤖 Meet fsc.bot</h3>
        <div class="welcome-text">
          <p>
            <b>fsc.bot</b> is the resident bot for server, built from the ground up for fullstack.chat. The bot is under constant development and is learning new things every day.
          </p>
          <p>
            For a list of its current capabilities, use <code>!fsc help</code> in the server. To view the source (yes, it's even open source!), click on the link below;
          </p>
          <p>
            <a href="https://github.com/bmorrisondev/fsc.bot" target="_blank" class="section-link">View the code on GitHub</a>
          </p>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-20 h-96 flex justify-center items-center flex-col">
      <div class="w-12/12">
        <h3 class="section-header centered-header">👩‍💻 Other Activities 👨‍💻</h3>
      </div>
      <div class="flex space-x-4">
        <div class="w-4/12 h-full">
          <Card header="Workshops & Talks">
            <p>
              We schedule regular workshops and technical presentations for our members. Only active members are eligible to present or host, but all are welcome to join & ask questions!
            </p>
            <p>
              If you are interested in presenting, coordinate with <i>brianmmdev</i> on the server or on <a href="https://twitter.com/brianmmdev" target="_blank">Twitter @brianmmdev</a>.
            </p>
          </Card>
        </div>
        <div class="w-4/12 h-full">
          <Card header="Giveaways">
            <p>
              Active members are eligble for a regular, free giveaway hosted every other month. Giveaways are generally courses or other learning material to help you grow!
            </p>
            <h4>Current Giveaway:</h4>
            <p>There is no giveaway at this moment. Join the Discord to be notified of future giveaways!</p>
          </Card>
        </div>
        <div class="w-4/12 h-full">
          <Card header="Mentorships (coming soon)">
            <p>
              We're currently working on a mentorship system where members can tag themselves as a mentor in a specific area. More on this coming soon!
            </p>
          </Card>
        </div>
      </div>
    </div>

    <!-- Rules Section -->
    <div class="container mx-auto px-20 flex flex-col justify-center items-center pt-12">
      <h3 class="section-header centered-header">💬 Join the Conversation!</h3>
      <Rules :content="$page.rules.content" />
    </div>

  </Layout>
</template>

<page-query>
query {
  rules: document (path: "/src/docs/rules/") {
    title
    content
  }
}
</page-query>

<script>
import ChatBubble from '@/components/ChatBubble'
import BotImage from '@/components/BotImage'
import Card from '@/components/Card'
import Rules from '@/components/Rules'

export default {
  metaInfo: {
    title: 'fullstack.chat',
    meta: [
      { name: 'og:title', content: `fullstack.chat` },
      { name: 'og:description', content: 'We are a welcome and opening community of developers of all skillsets and experience levels.' },
      { name: 'og:url', content: `https://fullstack.chat` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'og:site_name', content: 'fullstack.chat' },
      { name: 'og:image', content: 'https://fullstack.chat/assets/images/og-image.png' }
    ]
  },
  components: {
    ChatBubble,
    BotImage,
    Card,
    Rules
  }
}
</script>

<style lang="sass" scoped>
a
  color: white !important
  border-bottom: 2px solid #00a8e8

a:hover
  text-decoration: none !important
  border-bottom: 2px solid #003459

.section-link
  margin-right: 10px

.logo
  max-width: 250px
  display: block

.logo-sm-screen
  // max-width: 250px
  align-content: right
  /* margin: 20px auto; *
  margin: 0px auto
  display: block

.full-height-row
  height: 100vh

.activity-container
  color: white
  border: 2px solid #003459
  background-color: rgba(0, 52, 89, 0.6)
  border-radius: 15px
  padding: 20px
  margin: 10px auto
  height: 90%

.container-wrapper
  min-height: 100%;  // /* Fallback for browsers do NOT support vh unit *
  min-height: 100vh; // /* These two lines are counted as one :-)       *
  display: flex
  align-items: center

h1, h2, h3, h4, h5, h6
  display: inline-block

h3
  color: white

code
  background-color: rgba(0, 52, 89, 0.6)
  border-radius: 5px
  padding: 0px 2px
  color: #FF8500 !important

.centered-header
  text-align: center

.section
  min-height: 550px

.welcome-col
  display: flex
  flex-direction: row

.welcome-content
  padding: 0px 20px
  margin-top: auto
  margin-bottom: auto

.welcome-text
  color: white
  font-size: 22px
  margin-bottom: 20px

.small-screen-spacer
  height: 200px

.agree-to-rules-check
  padding-right: 10px

</style>
