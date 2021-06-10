<template>
  <div class="home">
    <img alt="Vue logo" class="nes-avatar is-large"  style="image-rendering: pixelated;" src="../assets/logo.png">
    <img class="nes-avatar is-rounded is-large" alt="Gravatar image example" src="https://www.gravatar.com/avatar?s=15" style="image-rendering: pixelated;">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
