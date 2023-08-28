<template>
  <Layout>
    <div class="container mx-auto">
      <div class="flex">
        <h1 class="section-header header-centered">Member Profiles</h1>
      </div>
      <div class="flex flex-wrap">
        <ProfileCard v-for="(p, index) in profiles" :key="index" :profile="p" />
      </div>
    </div>
  </Layout>
</template>

<script>
import ProfileCard from '@/components/ProfileCard'

export default {
  components: {
    ProfileCard
  },
  data() {
    return {
      profiles: []
    }
  },
  async created() {
    if(process.isClient) {
      let res = await fetch(`${process.env.GRIDSOME_API_URL}/profiles`)
      let json = await res.json()

      json.forEach(profile => {
        if(profile.document.username) {
          this.profiles.push(profile)
        }
      })
    }
  },
  methods: {
    buildLinks(profile) {
      let links = {}

      if(Object.keys(links).length < 3 && profile.twitter) {
        links.twitter = profile.twitter
      }

      if(Object.keys(links).length < 3 && profile.github) {
        links.github = profile.github
      }

      if(Object.keys(links).length < 3 && profile.website) {
        links.website = profile.website
      }

      return links
    }
  }
}
</script>