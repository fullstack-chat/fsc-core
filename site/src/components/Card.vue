<template>
  <div class="card flex justify-center items-center h-full text-white">
    <div class="max-w-sm border-2 p-6 rounded-md tracking-wide shadow-lg h-full">
        <div class="flex items-center mb-4">
          <img alt="avatar" class="w-20 rounded-full border-2 border-gray-300" :src="`/assets/images/${img}`" v-if="img" />
          <div>
            <h4 class="card-header text-xl font-semibold">{{header}}</h4>
            <h5 class="card-subheader font-semibold text-blue-600" v-if="subheader">{{subheader}}</h5>
          </div>
        </div>
        <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    header: String,
    subheader: String,
    img: String
  }
}
</script>

<style lang="sass" scoped>
.card
  background-color: #121212
</style>