<template>
  <div>
    <dv-button></dv-button>
  </div>
</template>

<script>

import DvButton from '../components/button/DvButton'
export default {
  name: 'App',
  components: {
    DvButton
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
