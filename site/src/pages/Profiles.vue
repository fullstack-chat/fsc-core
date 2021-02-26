<template>
  <Layout>
    <div class="container mx-auto">
      <div class="flex">
        <h1 class="section-header header-centered">Member Profiles</h1>
      </div>
      <div class="flex flex-wrap">
        <div class="lg:w-1/4 sm:w-1/3 w-full pb-4 m-4" v-for="(p, index) in profiles" :key="index">
          <div class="bg-white dark:bg-gray-900 h-full text-white flex flex-col shadow-lg rounded-lg">
            <div class="profile-img">
              <img class="img-fluid" :src="p.imageUrl" />
            </div>
            <div class="name">{{ p.name }}</div>
            <div class="bio flex-1">
              {{ p.bio.length > 80 ? `${p.bio.substring(0, 77)}...` : p.bio }}
            </div>
            <div class="links pb-2">
              <div class="link" v-for="(key, index) in Object.keys(p.links)" :key="index">
                <a :href="generateLink(key, p.links[key])" target="_blank">
                  <img :src="`/assets/images/socials/${key}.png`" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Nav from "@/components/Nav.vue"
import profiles from '@/data/profiles.json'
import githubLogo from "super-tiny-icons/images/svg/github.svg";

export default {
  components: {
    Nav
  },
  data() {
    return {
      profiles
    }
  },

  methods: {
    generateLink(key, value) {
      if(key === "github") {
        console.log("github")
        return `https://github.com/${value}`
      }

      if(key === "website") {
        return value
      }

      if(key === "twitter") {
        value = value.replace("@", "")
        return `https://twitter.com/${value}`
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.profile-card
  margin: 10px
  padding: 5px
  display: flex
  flex-direction: column
  color: #fff
  border: 2px solid #003459
  background-color: rgba(0,52,89,.6)
  border-radius: 15px
  min-height: 260px

.name
  font-weight: bold
  font-size: 1.1em
  text-align: center

.profile-img
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  padding: 10px

  img
    height: 75px
    width: 75px
    border-radius: 100px
    border: 3px solid #003459

.bio
  padding: 10px 20px
  flex: 1

.links
  display: flex
  flex-direction: row
  justify-content: space-evenly

.link
  border-left: 1px solid #003459
  display: flex
  justify-content: center
  align-items: center
  width: 100%

  &:first-child
    border-left: none !important

  img
    max-height: 25px
    max-width: 25px
    margin-bottom: 5px
</style>