<template>
  <a-layout style="min-height: 100vh; max-height: 100vh;">
    <a-layout-sider v-model:collapsed="collapsed" :style="{minHeight: '100%', maxHeight: '100%', overflow: 'auto'}" :trigger="null"
                    collapsible>
      <div class="logo-container" v-if="!collapsed">
        <img src="@/assets/logo.svg" class="logo">
      </div>
      <cus-menu
          v-model:selectedKeys="menuSelectedKeys"
          :collapsed="collapsed"
          :data-source="routers"
          :open-one="true"
          v-on:change:select="onMenuItemSelect"
      />
    </a-layout-sider>
    <a-layout style="max-height: 100%;">
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
        <div class="cus-tabs-container">
          <cus-tabs v-model:activeKey="activeTabKey" v-model:tabs="openTabs" @edit="onTabsEdit"/>
          <div class="navigation-bar">
            <a-breadcrumb>
              <a-breadcrumb-item v-for="(i, k) in matchedRoutes" :key="k">{{ i?.meta?.title }}</a-breadcrumb-item>
            </a-breadcrumb>
          </div>
        </div>
        <router-view #="{Component}">
          <keep-alive :exclude="/(Form|Detail|Self)$/">
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import CusMenu from '@/components/menu/CusMenu'
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from "@ant-design/icons-vue";
import CusTabs from '@/components/menu/CusTabs'
// eslint-disable-next-line no-unused-vars
import {computed, reactive, toRaw} from "vue";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import {mapState, useStore} from "vuex";

const LAST_OPEN_TABS = 'HRMS_LAST_OPEN_TABS'
const LAST_SELECTED_TAB = 'HRMS_LAST_SELECTED_MENU'

export default {
  name: "DefaultLayout",
  components: {
    CusMenu, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined,
    CusTabs
  },
  setup() {
    const store = useStore()
    const routers = computed(() => store.getters.parsedMenu)
    return {
      routers
    }
  },
  data() {
    return {
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
        const chooseTab = this.openTabs.find(t => t.key === value)
        chooseTab && this.$router.push({
          path: chooseTab.path
        })
      }
    },
    matchedRoutes() {
      return this.$route.matched
    },
    ...mapState({
      currentPath: state => state.currentPath
    })
  },
  watch: {
    menuSelectedKeys(val) {
      this.saveScene(val?.[0])
    },
    currentPath(nv) {
      const index = this.openTabs.findIndex(i => i.key === nv.meta.key)
      if (index < 0) {
        if (nv.meta.key && nv.meta.title) {
          this.openTabs.push({
            key: nv.meta.key,
            title: nv.meta.title,
            path: nv.path
          })
        }
      }
      this.menuSelectedKeys = [nv.meta.key]
    },
    openTabs(nv) {
      this.closeOther(nv)
    }
  },
  methods: {
    onMenuItemSelect(arg, sourceItem) {
      if (sourceItem.path) {
        this.$router.push({
          path: sourceItem.path ?? '/'
        })
      } else {
        console.warn('HRMS: path not defined at this menu item!')
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
    closeOther(keys) {
      keys?.[0] && this.saveScene(keys[0].key)
    },
    saveScene(menuItemKey) {
      const rawOpenTabs = toRaw(this.openTabs)
      const rawCurrentTab = rawOpenTabs?.find(i => i.key === menuItemKey)
      if (rawOpenTabs && rawCurrentTab) {
        localStorage.setItem(LAST_OPEN_TABS, JSON.stringify(rawOpenTabs))
        localStorage.setItem(LAST_SELECTED_TAB, JSON.stringify(rawCurrentTab))
      }
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
.logo-container{
  padding-top: 40px;
  padding-bottom: 20px;
  .logo{
    width: 200px;
    height: 80px;
  }
}

</style>
