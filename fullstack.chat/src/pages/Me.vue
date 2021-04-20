<template>
  <Layout>
    <ClientOnly>
      <div class="container mx-auto" v-if="isLoaded">
        <section class="justify-center flex" >
          <div class="w-1/2 text-white bg-white dark:bg-gray-900 p-8 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg flex flex-col" >
            <div class="profile-header">
              <div class="profile-wrapper">
                <img :src="`https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.png?size=128`" />
              </div>
              <div class="user-info flex-1">
                <div class="field-header">Username:</div>
                <div class="field-value">{{userInfo.username}}</div>

                <!-- <div class="field-header">Join Date:</div>
                <div class="field-value">3/1/2019</div> -->

                <div class="field-header">Current Xp:</div>
                <div class="field-value">{{userInfo.xp}}xp</div>

                <div class="field-header">Level:</div>
                <div class="field-value">{{level}}</div>

                <!-- <div class="field-header">Lifetime Xp:</div>
                <div class="field-value">67899xp</div> -->

                <div class="field-header">Make Profile Public:</div>
                <input type="checkbox" name="isPublic" v-model="formInfo.isPublic">

                <div class="field-header">Bio:</div>
                <textarea v-model="formInfo.bio" class="text-black border-1 px-4 py-2 rounded w-full h-24"></textarea>
              </div>
            </div>
            <hr class="mt-4"/>

            <div class="me-social">
              <h2>
                Social Info
              </h2>

              <label for="twitter" class="font-semibold block pb-1">Twitter:</label>
              <div class="flex">
                <input class="text-black border-1 px-4 py-2 rounded w-1/2" type="text" name="twitter" placeholder="ex: @brianmmdev" v-model="formInfo.twitter" />
              </div>

              <label for="github" class="font-semibold block pb-1">GitHub:</label>
              <div class="flex">
                <input class="text-black border-1 px-4 py-2 rounded w-1/2" type="text" name="github" placeholder="ex: bmorrisondev" v-model="formInfo.github"/>
              </div>

              <label for="website" class="font-semibold block pb-1">Website:</label>
              <div class="flex">
                <input class="text-black border-1 px-4 py-2 rounded w-1/2" type="text" name="website" v-model="formInfo.website"/>
              </div>
            </div>
<!--
            <div class="field-header">Twitter:</div>
            <div class="field-value">
              <input type="text" id="twitter" name="twitter" v-model="formInfo.twitter">
            </div>

            <div class="field-header">GitHub:</div>
              <div class="field-value">
                <input type="text" id="github" name="github" v-model="formInfo.github">
              </div>

              <div class="field-header">Website:</div>
              <div class="field-value">
                <input type="text" id="website" name="website" v-model="formInfo.website">
              </div>
            </div> -->

            <div class="flex flex-col">
              <h2 class="text-left w-full"> Notification Roles </h2>

              <div class="flex items-center" v-for="roleId in Object.keys(pingRoles)" :key="roleId">
                <input type="checkbox" v-model="pingRoles[roleId].checked">
                <label class="ml-2">{{ pingRoles[roleId].name }}</label>
              </div>

              <!-- <div class="flex items-center">
                <input type="checkbox" id="role-id456" name="role-id456">
                <label class="ml-2" for="role-id456">Ping: Voice Chat</label>
              </div>

              <div class="flex items-center">
                <input type="checkbox" id="role-id789" name="role-id789">
                <label class="ml-2" for="role-id789">Ping: Community Project</label>
              </div> -->
            </div>

            <div class="me-footer pt-8">
              <div v-if="level < 5">
                <div class="bg-yellow-50 border-l-8 border-yellow-900 mb-2 rounded">
                  <div class="flex items-center">
                      <div class="p-2">
                          <div class="flex items-center">
                              <p class="px-6 py-4 text-yellow-900 font-semibold text-lg">Server Level Warning</p>
                            </div>
                            <div class="px-6 mb-4">
                              <p class="text-md font-bold text-yellow-500 text-sm">You may set your profile info, but it will only be active on the website if your level is 5 or greater.</p>
                              <a class="text-gray-800 underline" href="https://www.notion.so/fullstackchat/Walter-3f6ecd2d4ea440458b36504cbcd4a5f4" target="_blank">Click here to learn more about our XP system.</a>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <button class="text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800" @click="save">Save</button>
              {{ savingStatus }}
            </div>

          </div>
        </section>
      </div>
    </ClientOnly>
  </Layout>
</template>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      isLoaded: false,
      token: '',
      userInfo: {},
      formInfo: {},
      level: '',
      savingStatus: '',
      pingRoles: {
        '797934903584620635': {
          name: 'Voice Chat Active',
          checked: false
        },
        '770687332701044747': {
          name: 'Community Project',
          checked: false
        }
      }
    }
  },

  async mounted() {
    if(process.isClient) {
      this.token = localStorage.getItem("access_token")
      let opts = {
        method: 'get',
        url: `${process.env.GRIDSOME_API_URL}/me`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }

      try {
        let response = await axios(opts)
        this.userInfo = response.data;
        if(this.userInfo.xpData && this.userInfo.xpData.currentXp) {
          this.userInfo.xp = this.userInfo.xpData.currentXp;
          this.level = this.getLevelByXp(this.userInfo.xpData.currentXp)
        }

        if(response.data.profile) {
          this.formInfo = response.data.profile

          if(response.data.profile.pingRoles) {
            response.data.profile.pingRoles.forEach(roleId => this.pingRoles[roleId].checked = true)
          }
        }
      } catch (err) {
        console.error(err)
        if(err.response && err.response.status === 401) {
          window.location = process.env.GRIDSOME_LOGIN_URL
        }
      }
      this.isLoaded = true;
    }
  },

  methods: {
    getLevelByXp: function (xp) {
      const levelUpConst = 0.4;
      return Math.floor(levelUpConst * Math.sqrt(xp))
    },

    save: async function (event) {
      event.preventDefault();
      this.savingStatus = 'Saving..'

      let profile = this.formInfo
      profile.img = `https://cdn.discordapp.com/avatars/${this.userInfo.id}/${this.userInfo.avatar}.png?size=128`
      profile.username = this.userInfo.username
      if(profile.twitter) {
        profile.twitter = profile.twitter
          .replace("https://twitter.com/", "")
          .replace("@", "")
      }

      if(profile.github) {
        profile.github = profile.github
          .replace("https://github.com/", "")
      }

      profile.links = {
        twitter: this.formInfo.twitter,
        website: this.formInfo.website,
        github: this.formInfo.github
      }

      profile.pingRoles = []
      Object.keys(this.pingRoles).forEach(el => {
        if(this.pingRoles[el].checked) {
          profile.pingRoles.push(el)
        }
      })

      try {
        let opts = {
          method: 'put',
          url: `${process.env.GRIDSOME_API_URL}/update-profile`,
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          data: profile
        }
        await axios(opts);
        this.savingStatus = '✅'

        const ctx = this
        setTimeout(() => ctx.savingStatus = '', 3000)
      } catch(err) {
        console.error("An error occurred while saving...", err)
        this.savingStatus = '❌An error occurred'
      }
    }
  }
}
</script>

<style scoped>
.me-wrapper {
	display: flex;
	justify-content: center;
	color: white;
}

.me-wrapper .me-container {
	width: 700px;
	background-color: #222;
	border-radius: 10px;
	padding: 15px;
}

.profile-header {
	display: flex;
}

.profile-header .profile-wrapper img {
	border-radius: 100px;
	padding: 15px;
}

.profile-header .user-info .field-header {
	color: #ccc;
	font-style: italic;
}

.profile-header .user-info .field-value {
	margin-top: -10px;
	font-size: 1.5rem;
}

.profile-header .user-info .me-roles {
	display: flex;
	flex-direction: column;
}
</style>