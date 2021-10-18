<template>
  <div id="create-canvas">

  </div>
</template>

<script>
import * as PIXI from 'pixi.js'
import { onMounted } from 'vue'

export default {
  name: 'CreateDesk',
  setup(){
    onMounted(() => {
      let app = new PIXI.Application({ width: 640, height: 360 });
      const createCanvas = document.getElementById('create-canvas')
      createCanvas.appendChild(app.view)

      let obj = new PIXI.Graphics();
      obj.beginFill(0xff0000);
      obj.drawRect(0, 0, 200, 100);

      app.stage.addChild(obj);
    })
  }
}
</script>

<style scoped>

</style>
