<template>
  <a-layout style="min-height: 100vh;">
    <a-layout-sider :style="{minHeight: '100%'}" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <cus-menu
          :data-source="menu"
          :collapsed="collapsed"
          v-on:change:select="onMenuItemSelect"
      ></cus-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <a-button @click="toggleCollapsed">
          K
        </a-button>
      </a-layout-header>
      <a-layout-content>
        <router-view #="{Component}">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import CusMenu from '@/components/cusMenu'
import {UserOutlined} from "@ant-design/icons-vue";

export default {
  name: "DefaultLayout",
  components: {
    CusMenu, UserOutlined
  },
  data() {
    return {
      menu: {
        items: [
          {
            title: '职工自助',
            type: 'menuItem'
          },
          {
            title: '统计分析',
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
          },
          {
            title: '基础设置',
            type: 'subMenu',
            children: [
              {
                title: '基础数据',
                type: 'menuItem'
              }
            ]
          }
        ]
      },
      collapsed: false
    }
  },
  setup() {

  },
  methods: {
    onMenuItemSelect(arg) {
      console.log(arg)
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="less" scoped>
</style>
