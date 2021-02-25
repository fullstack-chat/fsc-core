<template>
  <Layout hideLogo>
    <header class="bg-white dark:bg-gray-800">
      <div class="container px-6 py-16 mx-auto">
        <div class="items-center md:flex">
          <div class="w-full md:w-1/2">
            <div class="max-w-lg">
              <h1
                class="text-2xl font-semibold text-gray-800 uppercase dark:text-white md:text-3xl"
              >
                👋 Welcome to Fullstack Chat!
              </h1>
              <p class="mt-2 text-gray-600 dark:text-gray-400">
                We are a welcome and opening community of developers of all
                skillsets and experience levels. Scroll down to see what our
                community is all about!
              </p>
            </div>
          </div>

          <div
            class="flex items-center justify-center w-full mt-6 md:mt-0 md:w-1/2"
          >
            <img class="w-1/2" src="/assets/images/logo-2.png" alt="" />
          </div>
        </div>
      </div>
    </header>

    <!-- Info Section -->
    <section
      class="bg-gray-100 dark:bg-gray-900 lg:py-24 lg:flex lg:justify-center"
    >
      <div
        class="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg"
      >
        <div class="md:w-1/2 px-6 md:px-0 order-last md:order-first">
          <img class="w-full rounded-lg" src="/assets/images/chat.jpg" alt="" />
        </div>

        <div class="max-w-xl px-6 py-12 lg:max-w-5xl md:w-1/2 order-first md:order-last">
          <h2
            class="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl"
          >
            A Friendly Place for Experts &
            <span class="text-indigo-600 dark:text-indigo-400">Beginners</span>
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
    <section
      class="bg-gray-100 dark:bg-gray-900 lg:py-24 lg:flex lg:justify-center"
    >
      <div
        class="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg"
      >
        <div class="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">
          <h2
            class="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl"
          >
            🤖 Meet Walter
          </h2>
          <p class="mt-4 text-gray-600 dark:text-gray-400">
            Walter is the resident bot for server, built from the ground up for
            fullstack.chat. The bot is under constant development and is
            learning new things every day.
          </p>
          <p class="mt-4 text-gray-600 dark:text-gray-400">
            For a list of its current capabilities, use
            <code>!fsc help</code> in the server. To view the source (yes, it's
            even open source!), click on the link below;
          </p>
          <a
            href="https://github.com/fullstack-chat/fsc.bot"
            target="_blank"
            class="text-gray-700 dark:text-white"
            >View the code on GitHub</a
          >
        </div>
        <div class="lg:w-1/2">
          <img
            class="w-full rounded-lg"
            src="/assets/images/bot-logo-transp.png"
            alt=""
          />
        </div>
      </div>
    </section>

    <!-- Rules Section -->
    <section
      class="bg-gray-100 dark:bg-gray-900 lg:py-24 lg:flex lg:justify-center"
    >
      <div
        class="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg"
      >
        <div class="max-w-xl px-6 py-12 mx-auto text-center">
          <h2
            class="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl"
          >
            💬 Come say Hello!
          </h2>
          <p class="mt-4 text-gray-600 dark:text-gray-400 text-left">
              Help keep our server friendly and welcoming by reading the rules on the rules page.
          </p>

          <div class="flex">
            <button
              type="button"
              class="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg font-bold text-white w-full lg:w-1/2 mx-auto mt-8"
              :disabled="!isUserAgreedToRules"
              @click="goToDiscord"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </section>
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
    title: "fullstack.chat",
    meta: [
      { name: "og:title", content: `fullstack.chat` },
      {
        name: "og:description",
        content:
          "We are a welcome and opening community of developers of all skillsets and experience levels.",
      },
      { name: "og:url", content: `https://fullstack.chat` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "og:site_name", content: "fullstack.chat" },
      {
        name: "og:image",
        content: "https://fullstack.chat/assets/images/og-image.png",
      },
    ],
  },
  data: function() {
    return {
      isUserAgreedToRules: false,
    };
  },
  methods: {
    goToDiscord: function() {
      window.location = "https://discord.gg/AptKHUS";
    },
  },
};
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
