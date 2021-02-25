<template>
  <div class="bot-logo-container">
    <g-image src="/assets/images/bot-logo-transp.png" class="bot-logo floaty-bot-logo" :class="{'floaty-bot-logo': animate }" />
  </div>
</template>

<script>
export default {
  name: "BotImage",
  props: {
    animate: Boolean
  }
}
</script>

<style lang="sass" scoped>
.bot-logo-container
  min-height: 400px
  position: relative

.bot-logo
  position: absolute
  left: 0
  top: 0
  backface-visibility: hidden
  perspective: 1000

.floaty-bot-logo
  animation: MoveUpDown 4s linear infinite

@keyframes MoveUpDown
  0%, 100%
    transform: translate(0, 0)

  50%
    transform: translate(0, 10px)
</style>