<template>
  <Layout>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>Member Profiles</h1>
        </div>
        <div class="col-md-4" v-for="(p, index) in profiles" :key="index">
          <div class="profile-card">
            <div class="profile-img">
              <img class="img-fluid" :src="p.imageUrl" />
            </div>
            <div class="name">{{ p.name }}</div>
            <div class="bio">
              {{ p.bio.length > 80 ? `${p.bio.substring(0, 77)}...` : p.bio }}
            </div>
            <div class="links">
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