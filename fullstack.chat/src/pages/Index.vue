<template>
  <Layout hideLogo>
    <div class="container mx-auto px-20 h-screen flex flex-wrap justify-center items-center">
      <div class="w-full md:w-3/12" >
        <!-- Shown on small screens -->
        <g-image alt="fullstack.chat logo" src="/assets/images/logo-2.png" class="logo mx-auto" />
        <!-- Shown on large creens -->
        <!-- <g-image alt="fullstack.chat logo" src="/assets/images/logo-2.png" class="logo img-fluid d-none d-lg-block" /> -->
      </div>
      <div class="w-full md:w-6/12">
        <h1>👋 Welcome to fullstack.chat!</h1>
        <div class="welcome-text">
          We are a welcome and opening community of developers of all skillsets and experience levels. Scoll down to see what our community is all about!
        </div>
      </div>
    </div>

    <!-- Info Section -->
    <section class="lg:py-24 lg:flex lg:justify-center">
      <div class="bg-white dark:bg-gray-900 py-16 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg" >
        <div class=" md:w-1/2 px-16 justify-center items-center order-last md:order-first flex flex-col">
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

        <div class="max-w-xl px-6 lg:max-w-5xl md:w-1/2 order-first md:order-last">
          <h2 class="font-bold text-gray-800 dark:text-white md:text-3xl pt-0" >
            😊 A Friendly Place for Experts &
            <span style="color: #4FB0FF">Beginners</span>
          </h2>
          <p class="mt-4 text-gray-600 dark:text-gray-400">
            Whether you're a seasoned expert or just getting started,
            fullstack.chat is a safe place to ask questions and grow as a
            developer. There's no such thing as a dumb question with us.
          </p>
        </div>
      </div>
    </section>


    <!-- Bot Section -->
    <section class="lg:py-24 lg:flex lg:justify-center" >
      <div class="bg-white dark:bg-gray-900 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg" >
        <div class="md:w-1/2 justify-center items-center order-last md:order-first flex relative">
          <BotImage animate/>
        </div>
        <div class="max-w-xl px-6 py-12 lg:max-w-5xl md:w-1/2 order-first md:order-last">
          <h2 class="section-header font-bold">🤖 Meet Walter</h2>
          <div class="welcome-text">
            <p>
              <b>Walter</b> is the resident bot for server, built from the ground up for fullstack.chat. The bot is under constant development and is learning new things every day.
            </p>
            <p>
              For a list of its current capabilities, use <code>!w help</code> in the server. To view the source (yes, it's even open source!), click on the link below;
            </p>
            <p>
              <a href="https://github.com/fullstack-chat/fsc-core" target="_blank" class="section-link">View the code on GitHub</a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-4 lg:px-20 flex justify-center items-center flex-col">
      <div class="w-full flex">
        <h3 class="section-header centered-header">👩‍💻 Other Activities 👨‍💻</h3>
      </div>
      <div class="flex flex-wrap">
        <div class="w-full md:w-4/12">
          <Card header="Workshops & Talks">
            <p>
              We schedule regular workshops and technical presentations for our members. Only active members are eligible to present or host, but all are welcome to join & ask questions!
            </p>
            <p>
              If you are interested in presenting, coordinate with <i>brianmmdev</i> on the server or on <a href="https://twitter.com/brianmmdev" target="_blank">Twitter @brianmmdev</a>.
            </p>
          </Card>
        </div>
        <div class="w-full md:w-4/12 h-full px-2 my-2 lg:my-0">
          <Card header="Giveaways">
            <p>
              Active members are eligble for a regular, free giveaway hosted every other month. Giveaways are generally courses or other learning material to help you grow!
            </p>
            <h4>Current Giveaway:</h4>
            <p>There is no giveaway at this moment. Join the Discord to be notified of future giveaways!</p>
          </Card>
        </div>
        <div class="w-full md:w-4/12 h-auto">
          <Card header="Mentorships (coming soon)">
            <p>
              We're currently working on a mentorship system where members can tag themselves as a mentor in a specific area. More on this coming soon!
            </p>
          </Card>
        </div>
      </div>
    </div>

    <!-- Rules Section -->
    <div class="container mx-auto px-4 lg:px-20 justify-center items-center pt-12 flex justify-center items-center">
      <div class="flex flex-col w-full md:w-1/2">
        <h3 class="section-header centered-header">💬 Come Say Hello!</h3>
        <Rules :content="$page.rules.content" />
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

<style scoped>
a {
	color: white !important;
	border-bottom: 2px solid #00a8e8;
}

a:hover {
	text-decoration: none !important;
	border-bottom: 2px solid #003459;
}

.section-link {
	margin-right: 10px;
}

.logo {
	max-width: 250px;
	display: block;
}

.logo-sm-screen {
	align-content: right;
  /* margin: 20px auto; * */
	margin: 0px auto;
	display: block;
}

.full-height-row {
	height: 100vh;
}

.activity-container {
	color: white;
	border: 2px solid #003459;
	background-color: rgba(0, 52, 89, 0.6);
	border-radius: 15px;
	padding: 20px;
	margin: 10px auto;
	height: 90%;
}

.container-wrapper {
	min-height: 100%;
	min-height: 100vh;
	display: flex;
	align-items: center;
}

h1, h2, h3, h4, h5, h6 {
	display: inline-block;
}

h3 {
	color: white;
}

code {
	background-color: rgba(0, 52, 89, 0.6);
	border-radius: 5px;
	padding: 0px 2px;
	color: #FF8500 !important;
}

.centered-header {
	text-align: center;
}

.section {
	min-height: 550px;
}

.welcome-col {
	display: flex;
	flex-direction: row;
}

.welcome-content {
	padding: 0px 20px;
	margin-top: auto;
	margin-bottom: auto;
}

.welcome-text {
	color: white;
	font-size: 22px;
	margin-bottom: 20px;
}

.small-screen-spacer {
	height: 200px;
}

.agree-to-rules-check {
	padding-right: 10px;
}

</style>
