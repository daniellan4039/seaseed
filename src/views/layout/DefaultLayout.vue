<template>
  <a-layout>
    <a-layout-sider :style="{minHeight: '100%'}">
    </a-layout-sider>
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout-content>Content</a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: "DefaultLayout",
  methods: {
  }
}
</script>

<style scoped lang="less">
</style>
