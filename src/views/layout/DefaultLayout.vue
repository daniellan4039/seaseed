<template>
  <a-layout style="min-height: 100vh;">
    <a-layout-sider :style="{minHeight: '100%'}">
      <cus-menu :data-source="menu"></cus-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout-content>Content</a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import CusMenu from '@/components/cusMenu'
export default {
  name: "DefaultLayout",
  components: {
    CusMenu
  },
  data(){
    return {
      menu: {
        items: [
          {
            title: '职工自助',
            type: 'menuItem'
          },
          {
            title: '职工中心',
            type: 'subMenu',
            children: [
              {
                title: '职工信息',
                type: 'menuItem'
              },
              {
                title: '职工家庭',
                type: 'menuItem'
              },
              {
                title: '职工教育',
                type: 'menuItem'
              }
            ]
          }
        ]
      }
    }
  },
  setup() {

  },
  methods: {
  }
}
</script>

<style scoped lang="less">
</style>
