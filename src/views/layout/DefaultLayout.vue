<template>
  <a-layout style="min-height: 100vh;">
    <a-layout-sider v-model:collapsed="collapsed" :style="{minHeight: '100%'}" :trigger="null" collapsible>
      <cus-menu
          v-model:selectedKeys="menuSelectedKeys"
          :collapsed="collapsed"
          :data-source="menu"
          v-on:change:select="onMenuItemSelect"
      ></cus-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="cus-header">
        <div class="menu">
          <MenuUnfoldOutlined v-if="collapsed" @click="toggleCollapsed"/>
          <MenuFoldOutlined v-else @click="toggleCollapsed"/>
        </div>
        <div class="company-block">
          <span>贵州盘江技术研究院</span>
        </div>
      </a-layout-header>
      <a-layout-content class="cus-content-container">
        <div class="cus-tabs-main">
          <cus-tabs v-model:activeKey="activeTabKey" :tabs="openTabs" @edit="onTabsEdit"></cus-tabs>
        </div>
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
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from "@ant-design/icons-vue";
import CusTabs from '@/components/cusTabs'

export default {
  name: "DefaultLayout",
  components: {
    CusMenu, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined,
    CusTabs
  },
  data() {
    return {
      menu: {
        items: [
          {
            title: '职工自助',
            type: 'menuItem',
            key: 'nav01'
          },
          {
            title: '统计分析',
            type: 'menuItem',
            key: 'nav02'
          },
          {
            title: '职工中心',
            type: 'subMenu',
            key: 'nav03',
            children: [
              {
                title: '职工信息',
                type: 'menuItem',
                key: 'nav04',
              },
              {
                title: '职工家庭',
                type: 'menuItem',
                key: 'nav05',
              },
              {
                title: '职工教育',
                type: 'menuItem',
                key: 'nav06',
              }
            ]
          },
          {
            title: '基础设置',
            type: 'subMenu',
            key: 'nav07',
            children: [
              {
                title: '基础数据',
                type: 'menuItem',
                key: 'nav08',
              }
            ]
          }
        ]
      },
      collapsed: false,
      openTabs: [],
      menuSelectedKeys: null
    }
  },
  setup() {

  },
  computed: {
    activeTabKey: {
      get() {
        return this.menuSelectedKeys?.length > 0 ? this.menuSelectedKeys[0] : null
      },
      set(value) {
        this.menuSelectedKeys = [value]
      }
    }
  },
  methods: {
    onMenuItemSelect(arg) {
      const {item, key} = arg
      const index = this.openTabs.findIndex(i => i.key === key)
      if (index < 0) {
        this.openTabs.push({
          key: key,
          title: item.title
        })
      }
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
    onTabsEdit(key) {
      if (this.openTabs?.length > 0) {
        const index = this.openTabs.findIndex(i => i.key === key)
        if (index >= 0) {
          this.openTabs.splice(index, 1)
          const lastIndex = (this.openTabs.length ?? 0) - 1
          if (lastIndex >= 0) {
            this.activeTabKey = this.openTabs[lastIndex]?.key
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.menu {
  font-size: 20px;
  display: inline-block;
}

.cus-header {
  padding: 0 18px;
  display: flex;
  background: white;
}

.company-block {
  margin: 0 10px;
  font-size: 16px;
  max-width: 200px;
  overflow: hidden;
}
</style>
