<template>
  <div class="rules">
    <div class="rules-intro">Before joining, read and agree to the rules below. Help keep our server friendly and welcoming!</div>
    <div class="rules-container" v-html="content"></div>

    <div class="rules-footer flex flex-col items-center">
      <div class="form-check agree-to-rules-check" >
        <input type="checkbox" class="form-check-input" id="isUserAgreedToRulesCheckbox" v-model="isUserAgreedToRules">
        <label class="form-check-label ml-1" for="isUserAgreedToRulesCheckbox">I read and agree to the rules above</label>
      </div>
      <button type="button"
        class="agree-to-rules-button rounded-md py-1 px-3"
        :class="{'agree-to-rules-button-disabled': !isUserAgreedToRules}"
        :disabled="!isUserAgreedToRules"
        @click="goToDiscord">Join fullstack.chat!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Name",
  props: {
    content: String
  },
  data: function () {
    return {
      isUserAgreedToRules: false
    }
  },
  methods: {
    goToDiscord: function () {
      window.location = "https://discord.gg/NsD4knqTee"
    }
  }
}
</script>

<style scoped>
.rules .rules-intro {
  color: white;
  margin: 10px 0px 20px 0px;
}

.rules .rules-container {
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 15px;
  padding: 20px;
  margin: 10px auto;
}

.rules .agree-to-rules-check {
  color: white;
  margin: 10px 0px;
}

.rules .agree-to-rules-button {
  background-color: #00A8E8 !important;
  color: white !important;
}

.rules .agree-to-rules-button-disabled {
  background-color: #3d6371 !important;
  cursor: not-allowed;
}
</style>