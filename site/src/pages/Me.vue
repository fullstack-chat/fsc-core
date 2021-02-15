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

            <div class="field-header">Join Date:</div>
            <div class="field-value">3/1/2019</div>

            <div class="field-header">Current Xp:</div>
            <div class="field-value">12345xp</div>

            <div class="field-header">Lifetime Xp:</div>
            <div class="field-value">67899xp</div>
          </div>
        </div>
        <hr />
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
          <button>Save</button>
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
      userInfo: {}
    }
  },
  async mounted() {
    const token = localStorage.getItem("access_token")
    let opts = {
      method: 'get',
      url: 'http://localhost:8888/.netlify/functions/me',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    let response = await axios(opts)
    this.userInfo = response.data;
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