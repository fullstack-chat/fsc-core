<template>
  <Layout hideLogo>
    <div class="container-wrapper">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-md-2">
            <!-- Shown on small screens -->
            <g-image alt="fullstack.chat logo" src="/assets/images/logo-2.png" class="logo-sm-screen img-fluid d-block d-lg-none" />
            <!-- Shown on large creens -->
            <g-image alt="fullstack.chat logo" src="/assets/images/logo-2.png" class="logo img-fluid d-none d-lg-block" />
          </div>
          <div class="col-md-6 welcome-col">
            <div class="welcome-content">
              <h1>👋 Welcome to fullstack.chat!</h1>
              <div class="welcome-text">
                We are a welcome and opening community of developers of all skillsets and experience levels. Scoll down to see what our community is all about!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Info Section -->
    <div class="container-fluid section">
      <div class="row justify-content-md-center">
        <div class="col-md-2 d-block d-lg-none">
          <div class="chat-animation ">
            <div class="chat-bubble chat-bubble-a" data-cycle-order="1">
              <div class="avatar">
                <g-image src="/assets/images/avatars/1.png" class="img-fluid" />
              </div>
              <div class="text-area">
                <div class="username">
                  noobmaster70
                </div>
                <div class="text">
                  Look at this cool thing I did!
                </div>
              </div>
            </div>
            <div class="chat-bubble chat-bubble-a" data-cycle-order="1">
              <div class="avatar">
                <g-image src="/assets/images/avatars/2.png" class="img-fluid" />
              </div>
              <div class="text-area">
                <div class="username">
                  cryptarchR
                </div>
                <div class="text">
                  Wow thats awesome! Great job 😀
                </div>
              </div>
            </div>
            <div class="chat-bubble chat-bubble-a" data-cycle-order="1">
              <div class="avatar">
                <g-image src="/assets/images/avatars/3.png" class="img-fluid" />
              </div>
              <div class="text-area">
                <div class="username">
                  wwwion_d1
                </div>
                <div class="text">
                  How exactly does this work? So cool...
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <h3 class="section-header">😊 A Friendly Place for Experts & Beginners!</h3>
            <div class="welcome-text">
              Whether you're a seasoned expert or just getting started, fullstack.chat is a safe place to ask questions and grow as a developer. There's no such thing as a dumb question with us.
            </div>
        </div>
        <div class="col-md-2 d-none d-lg-block">
          <div class="chat-animation ">
            <div class="chat-bubble chat-bubble-a" data-cycle-order="1">
              <div class="avatar">
                <g-image src="/assets/images/avatars/1.png" class="img-fluid" />
              </div>
              <div class="text-area">
                <div class="username">
                  noobmaster70
                </div>
                <div class="text">
                  Look at this cool thing I did!
                </div>
              </div>
            </div>
            <div class="chat-bubble chat-bubble-a" data-cycle-order="1">
              <div class="avatar">
                <g-image src="/assets/images/avatars/2.png" class="img-fluid" />
              </div>
              <div class="text-area">
                <div class="username">
                  cryptarchR
                </div>
                <div class="text">
                  Wow thats awesome! Great job 😀
                </div>
              </div>
            </div>
            <div class="chat-bubble chat-bubble-a" data-cycle-order="1">
              <div class="avatar">
                <g-image src="/assets/images/avatars/3.png" class="img-fluid" />
              </div>
              <div class="text-area">
                <div class="username">
                  wwwion_d1
                </div>
                <div class="text">
                  How exactly does this work? So cool...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bot Section -->
    <div class="container-fluid section">
      <div class="row justify-content-md-center">
        <div class="col-md-2">
          <div class="bot-logo-container">
            <g-image src="/assets/images/bot-logo-transp.png" class="img-fluid bot-logo" />
          </div>
          <!-- <g-image src="/assets/images/bot-logo-transp.png" class="img-fluid bot-logo-small" /> -->
        </div>
        <div class="col-md-4">
          <h3 class="section-header">🤖 Meet fsc.bot</h3>
          <div class="welcome-text">
            <p>
              <b>fsc.bot</b> is the resident bot for server, built from the ground up for fullstack.chat. The bot is under constant development and is learning new things every day.
            </p>
            <p>
              For a list of its current capabilities, use <code>!fsc help</code> in the server. To view the source (yes, it's even open source!), click on the link below;
            </p>
            <p>
              <!-- <a href="#" class="section-link">View the Help Docs</a>  -->
              <a href="https://github.com/bmorrisondev/fsc.bot" target="_blank" class="section-link">View the code on GitHub</a>
            </p>
          </div>
        </div>
        <div class="col-md-2 d-block d-lg-none small-screen-spacer">

        </div>
      </div>
    </div>

    <!-- Other Activities -->
    <div class="container section">
      <div class="row justify-content-md-center">
        <div class="col-md-12">
          <h3 class="section-header centered-header">👩‍💻 Other Activities 👨‍💻</h3>
        </div>
        <div class="col-md-4">
          <div class="activity-container">
            <h3>Workshops & Talks</h3>
            <p>
              We schedule regular workshops and technical presentations for our members. Only active members are eligible to present or host, but all are welcome to join & ask questions!
            </p>
            <p>
              If you are interested in presenting, coordinate with <i>brianmmdev</i> on the server or on <a href="https://twitter.com/brianmmdev" target="_blank">Twitter @brianmmdev</a>.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="activity-container">
            <h3>Giveaways</h3>
            <p>
              Active members are eligble for a regular, free giveaway hosted every other month. Giveaways are generally courses or other learning material to help you grow!
            </p>
            <h4>Current Giveaway:</h4>
            <p>There is no giveaway at this moment. Join the Discord to be notified of future giveaways!</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="activity-container">
            <h3>Mentorships <i>(coming soon)</i></h3>
            <p>
              We're currently working on a mentorship system where members can tag themselves as a mentor in a specific area. More on this coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>


    <!-- Rules Section -->
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-md-8">
          <h2>💬 Join the Conversation!</h2>
          <div class="rules-intro">Before joining, read and agree to the rules below. Help keep our server friendly and welcoming!</div>
          <div class="rules-container" v-html="$page.rules.content"></div>
          
          <div class="footer" >
            <div class="form-check agree-to-rules-check" >
              <input type="checkbox" class="form-check-input" id="isUserAgreedToRulesCheckbox" v-model="isUserAgreedToRules">
              <label class="form-check-label" for="isUserAgreedToRulesCheckbox">I read and agree to the rules above</label>
            </div>
            <button type="button" class="btn agree-to-rules-button" :disabled="!isUserAgreedToRules" @click="goToDiscord">Join fullstack.chat!</button>
          </div>
        </div>
      </div>
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
  data: function () {
    return {
      isUserAgreedToRules: false
    }
  },
  methods: {
    goToDiscord: function () {
      window.location = "https://discord.gg/AptKHUS"
    }
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
  // max-width: 250px
  margin-left: auto
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

.rules-intro 
  color: white
  margin: 10px 0px 20px 0px

.rules-container 
  color: white
  /* border: 2px solid #003459; *
  background-color: rgba(0, 0, 0, 0.6)
  border-radius: 15px
  padding: 20px
  margin: 10px auto

.agree-to-rules-check 
  color: white
  margin: 10px 0px

.agree-to-rules-button 
  background-color: #00A8E8 !important
  color: white !important

.chat-bubble 
  display: flex
  background-color: #36393F
  color: white
  border-radius: 5px
  margin-bottom: 5px

.chat-bubble .avatar 
  background-color: white
  border-radius: 100%
  height: 50px
  width: 50px
  padding: 10px
  margin: 5px

.chat-bubble .text-area 
  font-size: 14px

.chat-bubble .username 
  padding-top: 1px
  font-weight: bold

.chat-bubble .text-area .text 
  margin-top: -1px
  line-height: 16px

.bot-logo-container 
  min-height: 400px

.bot-logo 
  animation: MoveUpDown 4s linear infinite
  position: absolute
  left: 0
  top: 0
  backface-visibility: hidden
  perspective: 1000

@keyframes MoveUpDown 
  0%, 100% 
    transform: translate(0, 0)
  
  50% 
    transform: translate(0, 10px)
  

.small-screen-spacer 
  height: 200px

.agree-to-rules-check 
  padding-right: 10px

</style>
