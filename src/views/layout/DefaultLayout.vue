<template>
  <a-layout style="min-height: 100vh;">
    <a-layout-sider v-model:collapsed="collapsed" :style="{minHeight: '100%'}" :trigger="null" collapsible>
      <cus-menu
          v-model:selectedKeys="menuSelectedKeys"
          :collapsed="collapsed"
          :data-source="menu"
          :open-one="true"
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
          <cus-tabs v-model:activeKey="activeTabKey" v-model:tabs="openTabs" @edit="onTabsEdit">
          </cus-tabs>
          <div class="navigation-bar">
            <a-breadcrumb>
              <a-breadcrumb-item v-for="(i, k) in matchedRoutes" :key="k">{{ i?.meta?.title }}</a-breadcrumb-item>
            </a-breadcrumb>
          </div>
        </div>
        <a-config-provider :locale="locale">
<!--          <router-view #="{Component}">-->
<!--            <keep-alive>-->
<!--              <component :is="Component"></component>-->
<!--            </keep-alive>-->
<!--          </router-view>-->
          <router-view></router-view>
        </a-config-provider>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import CusMenu from '@/components/CusMenu'
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from "@ant-design/icons-vue";
import CusTabs from '@/components/CusTabs'
import {reactive, toRaw} from "vue";
import zhCN from 'ant-design-vue/es/locale/zh_CN';

const LAST_OPEN_TABS = 'HRMS_LAST_OPEN_TABS'
const LAST_SELECTED_TAB = 'HRMS_LAST_SELECTED_MENU'

export default {
  name: "DefaultLayout",
  components: {
    // eslint-disable-next-line vue/no-unused-components
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
      menuSelectedKeys: null,
      locale: zhCN
    }
  },
  computed: {
    activeTabKey: {
      get() {
        return this.menuSelectedKeys?.length > 0 ? this.menuSelectedKeys[0] : null
      },
      set(value) {
        this.menuSelectedKeys = [value]
      }
    },
    matchedRoutes() {
      return this.$route.matched
    }
  },
  watch: {
    menuSelectedKeys(val) {
      this.saveScene(val?.[0])
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
          this.loadLastOpenTab()
        }
      }
    },
    saveScene(menuItemKey) {
      const rawOpenTabs = toRaw(this.openTabs)
      const rawCurrentTab = rawOpenTabs?.find(i => i.key === menuItemKey)
      localStorage.setItem(LAST_OPEN_TABS, JSON.stringify(rawOpenTabs))
      localStorage.setItem(LAST_SELECTED_TAB, JSON.stringify(rawCurrentTab))
    },
    loadLastScene() {
      this.loadLastTabs()
      this.loadLastOpenTab()
    },
    loadLastTabs() {
      const lastTabs = JSON.parse(localStorage.getItem(LAST_OPEN_TABS))
      if (lastTabs) {
        this.openTabs = reactive(lastTabs)
      }
    },
    loadLastOpenTab() {
      const lastSelectedTab = JSON.parse(localStorage.getItem(LAST_SELECTED_TAB))
      const lastSelectedTabIndex = this.openTabs?.findIndex(i => i.key === lastSelectedTab?.key)
      if (lastSelectedTabIndex >= 0) {
        this.menuSelectedKeys = [lastSelectedTab.key]
      } else {
        const lastIndex = (this.openTabs.length ?? 0) - 1
        if (lastIndex >= 0) {
          this.activeTabKey = this.openTabs[lastIndex]?.key
        }
      }
    }
  },
  mounted() {
    this.loadLastScene()
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

.navigation-bar {
  padding-left: 16px;
  padding-bottom: 16px;
}
</style>
