<template>
  <div class="home-block">
    <div class="functions">
      <div class="title">
        <span><bulb-filled class="title-icon"/>常用功能</span>
        <a-button type="primary" shape="circle" @click="onMenuSet">
          <template #icon><setting-outlined /></template>
        </a-button>
      </div>
      <div class="menu">
        <template v-for="(m,k) in confirmedMenus" :key="k">
          <template v-for="(sm,smk) in m.children??[]" :key="smk">
            <cus-menu-icon :title="sm.title" :icon-type="sm.meta.icon" v-if="sm.meta.checked" :route="sm.path" @click="onCusMenuClick"
                           :icon-font-style="{color: sm.meta?.color??'#7D79F6'}"/>
          </template>
        </template>
      </div>
    </div>
    <div class="message-block">
      <div class="warning">
        <div class="title">
          <span><bulb-filled class="title-icon"/>业务警报</span>
        </div>
        <div class="content">
          <a-list item-layout="horizontal" :data-source="warningList" :pagination="warningList.length>0?true:false">
            <template #renderItem="{item}" >
              <a-list-item-meta>
                <template #title>
                  <span class="list-title">
                    <a>{{ item.title }}</a>
                    <span>2021-10-01</span>
                  </span>
                </template>
              </a-list-item-meta>
            </template>
          </a-list>
        </div>
      </div>
      <div class="workflow">
        <div class="title">
          <span><bulb-filled class="title-icon"/>审批流程</span>
        </div>
        <div class="content">
          <a-list item-layout="horizontal" :data-source="warningList" :pagination="warningList.length>0?true:false">
            <template #renderItem="{item}" >
              <a-list-item-meta>
                <template #title>
                  <span class="list-title">
                    <a>{{ item.title }}</a>
                    <span>2021-10-01</span>
                  </span>
                </template>
              </a-list-item-meta>
            </template>
          </a-list>
        </div>
      </div>
      <a-modal v-model:visible="showMenuSetting" :width="800" @ok="onMenuSetConfirm">
        <div v-for="(m,k) in menus" :key="k">
          <a-typography-title :level="3">{{ m.title}}</a-typography-title>
          <div class="menu-items">
            <cus-menu-icon v-for="(sm,smk) in m.children" :key="smk" :title="sm.title" :show-check-box="true"
                           v-model:checked="sm.meta.checked" :icon-type="sm.meta.icon"
                           :icon-font-style="{color: sm.meta?.color??'#7D79F6'}"></cus-menu-icon>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import CusMenuIcon from "@/components/menu/CusMenuIcon";
import {BulbFilled, SettingOutlined} from "@ant-design/icons-vue";
import {ref} from "vue";
import {getMenuFromBasePlatform} from "@/funcLib/menuParse";
import router from "@/router";

export default {
  name: "Home",
  components: { CusMenuIcon, SettingOutlined, BulbFilled } ,
  setup() {
    // 每个项里面填入title
    const warningList = ref([])
    const showMenuSetting = ref(false)
    const menus = ref([])
    const confirmedMenus = ref([])

    const onMenuSet = () => {
      showMenuSetting.value = !showMenuSetting.value
    }

    const onMenuSetConfirm = () => {
      localStorage.setItem('HRMS_CUSTOM_MENUS', JSON.stringify(menus.value))
      showMenuSetting.value = false
      confirmedMenus.value = menus.value
    }

    const onCusMenuClick = (route) => {
      router.push({path: route})
    }

    let savedMenuSetting = JSON.parse(localStorage.getItem('HRMS_CUSTOM_MENUS')??'[]')
    if (savedMenuSetting.length === 0) {
      getMenuFromBasePlatform().then(res => {
        savedMenuSetting = res.filter(r => r.type === 'subMenu')
      })
    }
    menus.value = savedMenuSetting
    confirmedMenus.value = savedMenuSetting

    return {
      warningList,
      showMenuSetting,
      menus,
      confirmedMenus,
      onMenuSet,
      onMenuSetConfirm,
      onCusMenuClick
    }
  }
}
</script>

<style scoped lang="less">
.home-block{
  height: 100%;
  display: flex;
  flex-direction: column;
  .title{
    font-size: 20px;
    margin-bottom: 30px;
    .title-icon{
      color: #2c6da5;
      margin-right: 8px;
    }
  }
  .list-title{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(128, 128, 128, 0.29);
    padding: 3px 0;
  }
  .functions{
    margin: 10px;
    padding: 20px;
    background: white;
    .title{
      display: flex;
      justify-content: space-between;
    }
  }
}
.message-block{
  display: flex;
  flex-grow: 6;
  margin-bottom: 10px;
  .warning{
    display: inline-block;
    background: white;
    flex-grow: 5;
    margin-left: 10px;
    padding: 20px;
  }
  .workflow{
    display: inline-block;
    background: white;
    margin-left: 10px;
    margin-right: 10px;
    flex-grow: 5;
    padding: 20px;
  }
}
.menu-items{

}
</style>
