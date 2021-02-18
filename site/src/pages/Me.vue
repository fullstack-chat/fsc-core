<template>
  <Layout>
    <div class="me-wrapper">
      <div class="me-container">
        <div class="profile-header">
          <div class="profile-wrapper">
            <img :src="`https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.png?size=128`" />
          </div>
          <div class="user-info">
            <div class="field-header">Username:</div>
            <div class="field-value">{{userInfo.username}}</div>

            <!-- <div class="field-header">Join Date:</div>
            <div class="field-value">3/1/2019</div> -->

            <div class="field-header">Current Xp:</div>
            <div class="field-value">{{userInfo.xpData.currentXp}}xp</div>

            <div class="field-header">Level:</div>
            <div class="field-value">{{getLevelByXp()}}</div>

            <!-- <div class="field-header">Lifetime Xp:</div>
            <div class="field-value">67899xp</div> -->

            <div class="field-header">Make Profile Public:</div>
            <input type="checkbox" name="isPublic">
          </div>
        </div>
        <hr />

        <div class="me-social">
          <h2>
            Social Info
          </h2>

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
        </div>

        <div class="me-roles">
          <h2>
            Notification Roles
          </h2>
          <input type="checkbox" id="role-id123" name="role-id123">
          <label for="role-id123">Ping: JavaScript Mentors</label>

          <input type="checkbox" id="role-id456" name="role-id456">
          <label for="role-id456">Ping: Voice Chat</label>

          <input type="checkbox" id="role-id789" name="role-id789">
          <label for="role-id789">Ping: Community Project</label>
        </div>

        <div class="me-footer">
          <button @click="save">Save</button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      token: '',
      userInfo: {},
      formInfo: {}
    }
  },
  async mounted() {
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

      if(response.data.profile) {
        this.formInfo = {
          twitter: response.data.profile.twitter,
          github: response.data.profile.github,
          website: response.data.profile.website,
        }
      }
    } catch (err) {
      if(err.response.status === 401) {
        window.location = process.env.GRIDSOME_LOGIN_URL
      }
    }
  },
  methods: {
    getLevelByXp: function () {
      const levelUpConst = 0.4;
      const xp = this.userInfo.xpData.currentXp;
      return Math.floor(levelUpConst * Math.sqrt(xp))
    },
    save: async function (event) {
      event.preventDefault();
      let opts = {
        method: 'put',
        url: `${process.env.GRIDSOME_API_URL}/update-profile`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: this.formInfo
      }

      await axios(opts);
    }
  }
}
</script>

<style lang="sass" scoped>
.me-wrapper
  display: flex;
  justify-content: center;
  color: white;

  .me-container
    width: 700px;
    background-color: #222;
    border-radius: 10px;
    padding: 15px;

    .profile-header
      display: flex;

      .profile-wrapper
        img
          border-radius: 100px;
          padding: 15px;

      .user-info
        .field-header
          color: #ccc;
          font-style: italic;

        .field-value
          margin-top: -10px;
          font-size: 1.5rem;

    .me-roles
      display: flex;
      flex-direction: column;

</style>