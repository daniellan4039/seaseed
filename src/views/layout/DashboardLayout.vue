<template>
  <a-layout class="root-container">
    <a-layout-sider class="cus-sider" theme="light" width="400">
      <div class="sticky-block">
        <a-input-search v-model:value="keywords" placeholder="搜索组织" @search="onSearch"/>
      </div>
      <div>
        <a-tree v-model:expandedKeys="expandedComKeys" :replace-fields="{key: 'id', title: 'name', children: 'children'}"
                :tree-data="companyTree"
                @select="onCompanySelect">
          <template #title="record">
            <a-typography-text v-model:content="record.name" :ellipsis="true"></a-typography-text>
          </template>
        </a-tree>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-content>
        <a-tabs type="card" class="full-height">
          <a-tab-pane tab="职工变动统计" key="employeeChange">
            <div>
              <div></div>
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="职工分布统计" key="employeeDistribution">
            sss
          </a-tab-pane>
          <a-tab-pane tab="职工名单" key="employeeList">
            sss
          </a-tab-pane>
        </a-tabs>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import {computed, ref} from "vue";
import {companyApi, departmentApi} from "@/service";
import {convertArrayToTree} from "@/funcLib/arrayFunc";

export default {
  name: "DashboardLayout",
  setup() {
    const companyOrigin = []
    const companyData = ref([])
    const departData = ref([])
    const expandedComKeys = ref([])
    const companyMap = ref({})
    const keywords = ref()

    // arg是包含点击节点的key的数组
    const onCompanySelect = (arg) => {
      if (arg.length) {
        setDepart(arg[0])
      }
      expandedComKeys.value = [...arg, ...expandedComKeys.value]
    }

    const setCompany = (companyId) => {
      companyApi.list({parentId: companyId}).then(res => {
        const {isSuccess, data} = res
        if (isSuccess) {
          if (companyId) {
            for (let i = 0; i < data.length; i++) {
              if (companyData.value.findIndex(c => c.id === data[i].id) === -1) {
                companyData.value.push(data[i])
              }
            }
          } else {
            companyData.value = data
            for (let i = 0; i < data.length; i++) {
              companyMap.value[data[i].id] = i
            }
          }
        }
        companyOrigin.length = 0
        companyOrigin.push(...companyData.value)
      })
    }

    const setDepart = (comId) => {
      comId = comId.substr(10)
      const com = companyData.value[companyMap.value[comId]]
      if (com) {
        const subDeparts = com.children.find(c => c.id === 'sub_depart'.concat(com.id))
        if (subDeparts?.children?.length === 0) {
          departmentApi.list({
            companyId: comId
          }).then(res => {
            const {data} = res
            for (let i = 0; i < data.length; i++) {
              subDeparts?.children.push(data[i])
            }
          })
        }
      }
    }

    const getCompanyTree = () => {
      const tree = convertArrayToTree(companyData.value, (parent, child) => {
        if(parent && child) {
          const subComIndex = parent?.children.findIndex(c => c.id === 'sub_com'.concat(parent.id))
          const subDepartIndex = parent?.children.findIndex(c => c.id === 'sub_depart'.concat(parent.id))

          const subComIndexOfChild = child?.children.findIndex(c => c.id === 'sub_com'.concat(parent.id))
          const subDepartIndexOfChild = child?.children.findIndex(c => c.id === 'sub_depart'.concat(parent.id))

          if (subComIndex === -1) {
            parent.children.push({
              name: '分子公司',
              id: 'sub_com'.concat(parent.id),
              type: 'subCom',
              children: [child]
            })
          } else {
            const subComs = parent.children[subComIndex]
            subComs.children.push(child)
          }
          if (subDepartIndex === -1) {
            parent.children.push({
              name: '本公司部门',
              id: 'sub_depart'.concat(parent.id),
              type: 'subDepart',
              children: []
            })
          }

          if(subComIndexOfChild === -1) {
            child.children.push({
              name: '分子公司',
              id: 'sub_com'.concat(child.id),
              type: 'subCom',
              children: []
            })
          }

          if(subDepartIndexOfChild === -1) {
            child.children.push({
              name: '本公司部门',
              id: 'sub_depart'.concat(child.id),
              type: 'subDepart',
              children: []
            })
          }
        }
      })
      if(tree.length === 0 && companyData.value.length > 0) {
        return companyData.value
      }
      return tree
    }

    const companyTree = computed(() => {
      return getCompanyTree()
    })

    const onSearch = () => {
      if (keywords.value && keywords.value?.length > 0) {
        const company = companyOrigin.filter(c => c.name.includes(keywords.value))
        companyData.value = company
      } else {
        companyData.value = companyOrigin
      }
    }


    setCompany()

    return {
      companyData,
      companyTree,
      departData,
      expandedComKeys,
      keywords,
      onCompanySelect,
      setCompany,
      setDepart,
      getCompanyTree,
      onSearch
    }
  }
}
</script>

<style lang="less" scoped>
.root-container {
  min-height: 100vh;
  max-height: 100vh;
}

.sticky-block {
  position: sticky;
  top: 0px;
  padding: 8px;
  background: white;
  z-index: 100;
}

.cus-sider {
  min-height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
.full-height{
  min-height: 100%;
}
</style>
