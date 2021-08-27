<template>
  <div class="hello">
    <dv-button></dv-button>
  </div>
</template>

<script>
import DvButton from "../../components/src/button/dv-button";
export default {
  name: 'HelloWorld',
  components: {DvButton},
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
