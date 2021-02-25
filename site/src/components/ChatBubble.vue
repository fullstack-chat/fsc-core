<template>
  <div class="chat-bubble">
    <div class="avatar">
      <g-image :src="`/assets/images/${imgPath}`" class="img-fluid" />
    </div>
    <div class="text-area">
      <div class="username">
        {{username}}
      </div>
      <div class="text">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatBubble",
  props: {
    username: String,
    imgPath: String
  }
}
</script>

<style lang="sass" scoped>

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
</style>