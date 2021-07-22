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
        <a-tabs :tabBarStyle="{ paddingLeft: '16px'}" class="full-height" style="background: white;" type="card">
          <a-tab-pane key="employeeChange" tab="职工变动统计">
            <div id="emp-change-top-block" class="full-height" style="background: white">
              <div style="margin: 8px 40px; height: 300px;">
                <span style="margin: 8px 0px; color: #488BF8;">本月人员变动情况</span>
                <div class="card">
                  <div style="text-align: right">
                    <a-select style="width: 100px;">
                      <a-select-option value="1">本月</a-select-option>
                      <a-select-option value="2">本年</a-select-option>
                    </a-select>
                  </div>
                  <div id="emp-change-block" class="flex-h-center">
                    <div id="emp-change-add">
                      <div class="flex-h-center">增加<span style="font-size: 24px; color: #e0614a">6</span>人</div>
                      <div>
                        <div class="emp-card">
                          <div class="img-container" style="background: #488BF8;">
                            <img src="@/assets/humen-check.png"/>
                          </div>
                          <div class="text-container">
                            <span><span style="font-size: 24px;">3</span>人</span>
                            <span>内部调用</span>
                          </div>
                        </div>
                        <div class="emp-card">
                          <div class="img-container" style="background: #73DEB3;">
                            <img src="@/assets/humen-green.png"/>
                          </div>
                          <div class="text-container">
                            <span><span style="font-size: 24px;">3</span>人</span>
                            <span>社会招聘</span>
                          </div>
                        </div>
                        <div class="emp-card">
                          <div class="img-container" style="background: #F7C739;">
                            <img src="@/assets/hat-edu.png"/>
                          </div>
                          <div class="text-container">
                            <span><span style="font-size: 24px;">3</span>人</span>
                            <span>学校招聘</span>
                          </div>
                        </div>
                        <div class="emp-card">
                          <div class="img-container" style="background: #488BF8;">
                            <img src="@/assets/soldier.png"/>
                          </div>
                          <div class="text-container">
                            <span><span style="font-size: 24px;">3</span>人</span>
                            <span>军人安置</span>
                          </div>
                        </div>
                      </div>

                    </div>
                    <a-divider style="margin: 0 40px;" type="vertical"></a-divider>
                    <div id="emp-change-reduce">
                      <div class="flex-h-center">减少<span style="font-size: 24px; color: #e0614a">6</span>人</div>
                      <div>
                        <div class="emp-card">
                          <div class="img-container" style="background: #488BF8;">
                            <img src="@/assets/humen-minus.png"/>
                          </div>
                          <div class="text-container">
                            <span><span style="font-size: 24px;">3</span>人</span>
                            <span>解除合同</span>
                          </div>
                        </div>
                        <div class="emp-card">
                          <div class="img-container" style="background: #73DEB3;">
                            <img src="@/assets/humen-green-right.png"/>
                          </div>
                          <div class="text-container">
                            <span><span style="font-size: 24px;">3</span>人</span>
                            <span>调走</span>
                          </div>
                        </div>
                        <div class="emp-card">
                          <div class="img-container" style="background: #F7C739;">
                            <img src="@/assets/oldman-yellow.png"/>
                          </div>
                          <div class="text-container">
                            <span><span style="font-size: 24px;">3</span>人</span>
                            <span>退休</span>
                          </div>
                        </div>
                        <div class="emp-card">
                          <div class="img-container" style="background: #7585A2;">
                            <img src="@/assets/heart-gray.png"/>
                          </div>
                          <div class="text-container">
                            <span><span style="font-size: 24px;">3</span>人</span>
                            <span>死亡</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="his-block">
                    <div class="flex-h-center fold"><CaretUpOutlined style="color: #488BF8;"/>查看历史变化趋势</div>
                    <div class="his-graph">

                    </div>
                  </div>
                </div>
              </div>
              <div id="statistic-block" class="flex-space-around" style="margin: 60px 40px 0 40px;">
                <div id="statistic-depart-block" style="flex-grow: 2;">
                  <span style="color: #488BF8">各部门人员变动统计</span>
                  <div class="card" style="margin-top: 8px;">
                    <div style="text-align: right">
                      <a-select style="width: 100px;">
                        <a-select-option value="1">本月</a-select-option>
                        <a-select-option value="2">本年</a-select-option>
                      </a-select>
                    </div>
                    <div style="height: 400px;">
                      <a-tabs>
                        <a-tab-pane key="origin" tab="原始数据">
                          <a-table :columns="departColumns" :scroll="{x:40, y: 200}" size="small">

                          </a-table>
                        </a-tab-pane>
                        <a-tab-pane key="" tab="竖状图">

                        </a-tab-pane>
                      </a-tabs>
                    </div>
                  </div>
                </div>
                <div id="statistic-new-block" style="flex-grow: 2;margin: 0 40px;">
                  <span style="color: #488BF8">新增人数学历统计</span>
                  <div class="card" style="margin-top: 8px;">
                    <div style="text-align: right">
                      <a-select style="width: 100px;">
                        <a-select-option value="1">本月</a-select-option>
                        <a-select-option value="2">本年</a-select-option>
                      </a-select>
                    </div>
                    <div style="height: 400px;">
                      <a-tabs>
                        <a-tab-pane key="newEdu" tab="新增学历统计">

                        </a-tab-pane>
                        <a-tab-pane key="newSex" tab="新增性别比例">

                        </a-tab-pane>
                      </a-tabs>
                    </div>
                  </div>

                </div>
                <div id="statistic-science-block" style="flex-grow: 1;">
                  <span style="color: #488BF8">新增科研成果统计</span>
                  <div class="card" style="margin-top: 8px;">
                    <div style="text-align: right">
                      <a-select style="width: 100px;">
                        <a-select-option value="1">本月</a-select-option>
                        <a-select-option value="2">本年</a-select-option>
                      </a-select>
                    </div>
                    <div class="science-block" style="height: 400px;">
                      <cus-icon icon-type="iconzhigongzhuanli" :iconStyle="{ fontSize: '100px', color: '#F6E566'}">
                        <template #title>
                          <div>本年新增专利数</div>
                          <div>8项</div>
                        </template>
                      </cus-icon>
                      <cus-icon icon-type="iconkeyanchengguo" :iconStyle="{ fontSize: '100px', color: '#66BBEA'}">
                        <template #title>
                          <div>本年新增科研成果</div>
                          <div>8项</div>
                        </template>
                      </cus-icon>
                      <cus-icon icon-type="iconzhigongzhicheng" :iconStyle="{ fontSize: '100px', color: '#FFA1D0'}">
                        <template #title>
                          <div>本年新增职称评定</div>
                          <div>8项</div>
                        </template>
                      </cus-icon>
                      <cus-icon icon-type="iconxueshulunwen" :iconStyle="{ fontSize: '100px', color: '#4EFDF0'}">
                        <template #title>
                          <div>本年新增论文数量</div>
                          <div>8项</div>
                        </template>
                      </cus-icon>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="employeeDistribution" tab="职工分布统计">
            sss
          </a-tab-pane>
          <a-tab-pane key="employeeList" tab="职工名单">
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
import CusIcon from "@/components/icon/CusIcon";
import {CaretUpOutlined} from "@ant-design/icons-vue";

export default {
  name: "DashboardLayout",
  components: {
    CusIcon, CaretUpOutlined
  },
  setup() {
    const companyOrigin = []
    const companyData = ref([])
    const departData = ref([])
    const expandedComKeys = ref([])
    const companyMap = ref({})
    const keywords = ref()
    const departColumns = [
      {
        title: '部门',
        dataIndex: 'departmentId',
        width: 20,
        ellipsis: true,
        slots: {customRender: 'departmentId'}
      },
      {
        title: '增加人数',
        dataIndex: 'increment',
        width: 20,
        ellipsis: true,
        slots: {customRender: 'increment'}
      },
      {
        title: '减少人数',
        dataIndex: 'reducement',
        width: 20,
        ellipsis: true,
        slots: {customRender: 'reducement'}
      },
    ]

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
        if (parent && child) {
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

          if (subComIndexOfChild === -1) {
            child.children.push({
              name: '分子公司',
              id: 'sub_com'.concat(child.id),
              type: 'subCom',
              children: []
            })
          }

          if (subDepartIndexOfChild === -1) {
            child.children.push({
              name: '本公司部门',
              id: 'sub_depart'.concat(child.id),
              type: 'subDepart',
              children: []
            })
          }
        }
      })
      if (tree.length === 0 && companyData.value.length > 0) {
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
      departColumns,
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

.full-height {
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}

.card {
  box-shadow: 0 0 5px 1px rgba(128, 128, 128, 0.22);
  background: white;
  padding: 20px;
}

.emp-card {
  display: inline-block;
  flex-direction: column;
  width: 115px;
  border-radius: 14%;
  margin: 0 8px;

  .img-container {
    height: 86px;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .text-container {
    background: #F9F9F9;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 50px;
    height: 50px;
    margin: auto;
  }

}

.inline {
  display: flex;
}

.science-block {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
}
.his-block{
  .fold{
    margin-top: 20px;
    cursor: pointer;
  }
  .his-graph{
    height: 200px;
    width: 100%;
    background: aliceblue;
  }
}
</style>
