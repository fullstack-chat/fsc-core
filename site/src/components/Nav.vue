<template>
  <div class="container">
    <div class="row nav-row">
      <div class="nav-left">
        <g-link to="/" v-if="!isLogoHidden">
          <img src="/assets/images/logo-2.png" class="img-fluid nav-logo" />
        </g-link>
        <g-link to="/" v-if="!isLogoHidden">
          <span class="title">fullstack.chat</span>
        </g-link>
      </div>
      <div class="nav-right">
        <ul class="nav-links">
          <g-link to="/">Home</g-link><span class="bullet">•</span>
          <g-link to="/profiles">Profiles</g-link><span class="bullet">•</span>
          <a href="https://www.notion.so/fullstackchat/Docs-9c3f2a571b6a4801b26ced27eb45cf90" target="_blank">Docs</a>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLogoHidden: Boolean
  }
}
</script>

<style lang="sass" scoped>
.nav-row 
  padding: 10px
  display: flex
  height: 66px

.nav-left, .nav-right 
  flex: 1
  display: flex
  flex-direction: row
  align-items: center

.nav-left
  .title 
    font-size: 28px
    color: white
    padding-left: 20px

  .nav-logo 
    max-width: 50px !important

  a
    text-decoration: none !important

.nav-right
  justify-content: flex-end
  
  ul 
    margin: inherit

  .nav-links 
    a 
      color: white
      text-decoration: none
      font-size: 18px
      
    a:hover 
      color: white
      text-decoration: underline

  .bullet 
    color: white
    padding: 0px 7px




</style>