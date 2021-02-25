<template>
  <div class="main">
    <Nav :isLogoHidden="hideLogo"/>
    <slot/>
    <div class="footer">
      <span class="copyright-and-docs">© {{new Date().getFullYear()}}</span>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  components: {
    Nav
  },
  props: {
    hideLogo: Boolean
  }
}
</script>

<style lang="sass">
body
  font-family: 'Open Sans', sans-serif
  margin: 0
  padding: 0px 0px 20px 0px
  line-height: 1.5
  background-color: #000F14 !important

p
  @apply pb-4

h1
  @apply text-4xl pb-3 mb-2 #{!important}

h3
  @apply text-2xl pb-1 mb-2 #{!important}

h1, h2, .section-header
  display: inline-block
  font-family: 'Lato', monospace
  color: white
  margin: 0 auto 10px auto
  padding-top: 15px
  padding-bottom: 5px;
  border-bottom: 2px solid #FF8500

.layout
  max-width: 760px
  margin: 0 auto
  padding-left: 20px
  padding-right: 20px

.header
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 20px
  height: 80px

.nav__link
  margin-left: 20px

.footer
  display: flex
  justify-content: center
  align-content: center
  padding-top: 20px

.copyright-and-docs
  color: white

  a
    margin-left: 5px

</style>
