<template>
  <a-config-provider :locale="locale">
    <router-view/>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import {getMenuFromBasePlatform} from "@/funcLib/menuParse";

export default {
  name: 'Root',
  setup(){
    getMenuFromBasePlatform()
    return {
      locale: zhCN
    }
  }
}
</script>
<style lang="less">
@import "style/index";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
}
</style>
