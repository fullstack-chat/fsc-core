<template>
  <Layout hideLogo>
    <div class="container mx-auto h-screen flex flex-wrap justify-center items-center">
      <div class="w-full md:w-8/12 p-5">
        <h1>Thank you! 👍</h1>
        <div class="welcome-text">
          <p>A few years back, I created a Discord with the goal of being a community for developers (both experienced & new) to build partnerships, make friends, and help grow one another. For a time, fullstack.chat was just that, but unfortunately the business of life has taken over the time many of us had to commit to this server.</p>
          <p>While the fullstack.chat Discord is now closed, there are many other communities to learn & grow as developers. If you are interested in interacting with myself or many of the former members, be sure to join the <b>Learn Build Teach</b> Discord, which is where I will calling my home Discord for the foreseeable future.</p>
          <p>Happy Coding! See you around.</p>
          <p class="mb-2">• Brian Morrison II (<a href="https://twitter.com/brianmmdev">@brianmmdev</a>)</p>
          <a class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="https://discord.gg/vM2bagU">
            Join Learn Build Teach
          </a>
					<p class="pt-5">Connect with the Mods:</p>
					<ul>
						<li>• Max Diamond <a href="https://twitter.com/Dmdboi">(@dmdboi)</a></li>
						<li>• SchwabTheDeck <a href="https://twitter.com/SchwabTheDeck">(@SchwabTheDeck)</a></li>
					</ul>
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
	font-size: 18px;
	margin-bottom: 20px;
}

.small-screen-spacer {
	height: 200px;
}

.agree-to-rules-check {
	padding-right: 10px;
}

</style>
