<template>
  <div class="lg:w-1/4 sm:w-1/3 w-full pb-4 m-4">
    <div class="bg-white dark:bg-gray-900 h-full text-white flex flex-col shadow-lg rounded-lg">
      <div class="profile-img">
        <img class="img-fluid" :src="profile.document.img" />
      </div>
      <div class="name">{{ profile.document.username }}</div>
      <div class="bio flex-1" v-if="profile.document.bio">
        {{ profile.document.bio.length > 80 ? `${profile.document.bio.substring(0, 77)}...` : profile.document.bio }}
      </div>
      <div class="bio-filler" v-else></div>
      <div class="links pb-2" v-if="profile.document.links">
        <div class="link" v-for="(key, index) in Object.keys(profile.document.links)" :key="index">
          <a :href="generateLink(key, profile.document.links[key])" target="_blank">
            <img :src="`/assets/images/socials/${key}.png`" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: Object
  },
  methods: {
    generateLink(key, value) {
      if(key === "github") {
        return `https://github.com/${value}`
      }

      if(key === "website") {
        return value
      }

      if(key === "twitter") {
        value = value.replace("@", "")
        value = value.replace("https://twitter.com/", "")
        return `https://twitter.com/${value}`
      }
    }
  }
}
</script>

<style>
.bio-filler {
  height: 68px;
}

.name {
	font-weight: bold;
	font-size: 1.1em;
	text-align: center;
}

.profile-img {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 10px;
}

.profile-img img {
	height: 75px;
	width: 75px;
	border-radius: 100px;
	border: 3px solid #003459;
}

.bio {
	padding: 10px 20px;
	flex: 1;
}

.links {
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}

.link {
	border-left: 1px solid #003459;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
}

.link:first-child {
	border-left: none !important;
}

.link img {
	max-height: 25px;
	max-width: 25px;
	margin-bottom: 5px;
}
</style>