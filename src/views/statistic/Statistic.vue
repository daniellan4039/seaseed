<template>
  <a-layout class="root-container">
    <a-layout-sider class="cus-sider" theme="light" width="400">
      <div class="sticky-block">
        <a-input-search v-model:value="keywords" placeholder="搜索组织" @search="onSearch"/>
      </div>
      <div class="tree-block">
        <a-tree v-model:expandedKeys="expandedComKeys" :replace-fields="{key: 'id', title: 'name', children: 'children'}"
                :tree-data="companyTree"
                @select="onCompanySelect">
        </a-tree>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-content class="content-container">
        <a-tabs :tab-bar-style="{ paddingLeft: '20px', paddingTop: '20px', paddingBottom: '20px', background: 'white'}" class="tabs"
                type="card">
          <a-tab-pane key="new" class="tabs-pane" tab="变动统计">
            <div class="ops-block">
              <span>查询范围：<cus-date-range/></span>
            </div>
            <div>
              <a-card title="人员变动">
                <div class="emp-change-block layout-center">
                  <div style="display: inline-block;">
                    <icon-card count="3" icon-background="#488bf8" icon-type="iconneibutiaoru" title="人员调动"/>
                    <icon-card count="3" icon-background="#73deb3" icon-type="iconshehuizhaopin" title="社会招聘"/>
                    <icon-card count="3" icon-background="#f7c739" icon-type="iconxuexiaozhaopin" title="学校招聘"/>
                    <icon-card count="3" icon-background="#488bf8" icon-type="iconjunrenanzhi" title="军人安置"/>
                  </div>
                  <div style="display: inline-block;">
                    <icon-card count="3" icon-background="#488bf8" icon-type="iconjiechuhetong" title="解除合同"/>
                    <icon-card count="3" icon-background="#73deb3" icon-type="icontiaozou" title="调走"/>
                    <icon-card count="3" icon-background="#f7c739" icon-type="icontuixiu" title="退休"/>
                    <icon-card count="3" icon-background="#7585a2" icon-type="iconsiwang" title="死亡"/>
                  </div>
                </div>
                <div class="layout-center check-history-block">
                  <span v-show="!showEmpHis" class="ops" @click="onCheckHis">
                    <CaretDownOutlined/>
                    <span>查看历史变化趋势</span>
                  </span>
                  <span v-show="showEmpHis" class="ops" @click="onCheckHis">
                    <CaretUpOutlined/>
                    <span>收起</span>
                  </span>
                  <div v-show="showEmpHis" class="graph"></div>
                </div>
              </a-card>
            </div>
            <div class="bottom-block">
              <a-row :gutter="8">
                <a-col :span="8">
                  <a-card title="性别比例" width="200">
                    <div class="graph"></div>
                  </a-card>
                </a-col>
                <a-col :span="8">
                  <a-card title="学历比例" width="200">
                    <div class="graph"></div>
                  </a-card>
                </a-col>
                <a-col :span="8">
                  <a-card title="科研成果统计" width="200">
                    <div class="science">
                      <cus-menu-icon :icon-font-style="{fontSize: '110px', color: '#FDBE05'}" icon-type="iconzhigongzhuanli">
                        <template #title>
                          <div>新增专利数</div>
                          <div style="color: #2c6da5;"><span style="font-size: 24px">8</span>项</div>
                        </template>
                      </cus-menu-icon>
                      <cus-menu-icon :icon-font-style="{fontSize: '110px', color: '#66BBEA'}" icon-type="iconkeyanchengguo">
                        <template #title>
                          <div>新增科研成果</div>
                          <div style="color: #2c6da5;"><span style="font-size: 24px">8</span>项</div>
                        </template>
                      </cus-menu-icon>
                      <cus-menu-icon :icon-font-style="{fontSize: '110px', color: '#F15478'}" icon-type="iconzhigongzhicheng">
                        <template #title>
                          <div>新增职称评定</div>
                          <div style="color: #2c6da5;"><span style="font-size: 24px">8</span>项</div>
                        </template>
                      </cus-menu-icon>
                      <cus-menu-icon :icon-font-style="{fontSize: '110px', color: '#14CDBD'}" icon-type="iconxueshulunwen">
                        <template #title>
                          <div>新增论文</div>
                          <div style="color: #2c6da5;"><span style="font-size: 24px">8</span>项</div>
                        </template>
                      </cus-menu-icon>
                    </div>
                  </a-card>
                </a-col>
              </a-row>
            </div>
          </a-tab-pane>
          <a-tab-pane key="employee" tab="职工统计">
            <div class="item-block">
              <a-card title="人员统计">
                <div class="card"></div>
              </a-card>
            </div>
            <div class="item-block">
              <a-row :gutter="16">
                <a-col :span="8">
                  <a-tabs :tab-bar-style="{margin:0}" type="card">
                    <a-tab-pane key="age" tab="年龄分布">
                      <div class="cus-box-shadow card">

                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="sex" tab="性别占比">
                      <div class="cus-box-shadow card">

                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="edu" tab="学历分布">
                      <div class="cus-box-shadow card">

                      </div>
                    </a-tab-pane>
                  </a-tabs>
                </a-col>
                <a-col :span="8">
                  <a-tabs :tab-bar-style="{margin:0}" type="card">
                    <a-tab-pane key="politic" tab="政治面貌">
                      <div class="cus-box-shadow card">

                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="professional" tab="职工职称">
                      <div class="cus-box-shadow card">

                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="workingAge" tab="工龄">
                      <div class="cus-box-shadow card">

                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="workingAgeLocal" tab="本企业工龄">
                      <div class="cus-box-shadow card">

                      </div>
                    </a-tab-pane>
                  </a-tabs>
                </a-col>
                <a-col :span="8">
                  <a-tabs :tab-bar-style="{margin:0}" type="card">
                    <a-tab-pane key="empType" tab="职工类型">
                      <div class="cus-box-shadow card">

                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="empSource" tab="职工来源">
                      <div class="cus-box-shadow card">

                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="empStatus" tab="职工状态">
                      <div class="cus-box-shadow card">

                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="empContractType" tab="职工合同类型">
                      <div class="cus-box-shadow card">

                      </div>
                    </a-tab-pane>
                  </a-tabs>
                </a-col>
              </a-row>
            </div>
          </a-tab-pane>
          <a-tab-pane key="company" class="company" tab="全部人员">
            <div class="ops-bar item-block">
              <a-input-search placeholder="请输入职工姓名" style="width: 200px"/>
            </div>
            <div class="table-block item-block">
              <a-table :columns="empTableColumns" :data-source="empOfCompanySource" size="small"></a-table>
            </div>
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
import {CaretDownOutlined, CaretLeftOutlined, CaretUpOutlined} from "@ant-design/icons-vue";
import CusDateRange from "@/components/form/date/CusDateRange";
import IconCard from "@/views/statistic/components/IconCard";
import CusMenuIcon from "@/components/menu/CusMenuIcon";

export default {
  name: "Statistic",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CusIcon, CusMenuIcon, CusDateRange, IconCard, CaretUpOutlined, CaretLeftOutlined, CaretDownOutlined
  },
  setup() {
    const companyOrigin = []
    const companyData = ref([])
    const companyMap = ref({})
    const departData = ref([])
    const expandedComKeys = ref([])
    const keywords = ref()
    const empOfCompanySource = ref([])
    const empTableColumns = ref([
      {
        title: '职工姓名',
        dataIndex: 'employeeId',
        width: 80,
        ellipsis: true,
        slots: {customRender: 'employeeId'}
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 80,
        ellipsis: true,
        slots: {customRender: 'sex'}
      },
      {
        title: '年龄',
        dataIndex: 'age',
        width: 40,
        ellipsis: true,
        slots: {customRender: 'age'}
      },
      {
        title: '部门',
        dataIndex: 'department',
        width: 80,
        ellipsis: true,
        slots: {customRender: 'department'}
      },
      {
        title: '职位',
        dataIndex: 'position',
        width: 80,
        ellipsis: true,
        slots: {customRender: '80'}
      },
      {
        title: '联系电话',
        dataIndex: 'phoneNumber',
        width: 100,
        ellipsis: true,
        slots: {customRender: 'phoneNumber'}
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: 80,
        ellipsis: true,
        slots: {customRender: 'action'}
      }
    ])
    const showEmpHis = ref(false)

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
          if (subDepartIndex === -1) {
            parent.children.push({
              name: '本公司部门',
              id: 'sub_depart'.concat(parent.id),
              type: 'subDepart',
              children: []
            })
          }
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

    const onCheckHis = () => {
      showEmpHis.value = !showEmpHis.value
    }

    setCompany()

    return {
      companyData,
      companyTree,
      departData,
      expandedComKeys,
      keywords,
      empOfCompanySource,
      empTableColumns,
      showEmpHis,
      onCompanySelect,
      setCompany,
      setDepart,
      getCompanyTree,
      onSearch,
      onCheckHis
    }
  }
}
</script>

<style lang="less" scoped>
.root-container {
  min-height: 100vh;
  max-height: 100vh;
}

.cus-sider {
  max-height: 100%;
  .sticky-block {
    position: sticky;
    top: 0;
    left: 2px;
    padding: 8px;
    background: white;
    z-index: 100;
  }
  .tree-block {

  }
}

.content-container {
  //max-height: 100%;
  overflow: auto;

  .tabs {
    height: 100%;
    margin-left: 2px;
    overflow: auto;

    .tabs-pane {
      padding: 0 20px 20px 20px;
    }

    .ops-block {
      background: white;
      text-align: right;
      padding: 20px;
    }

    .emp-change-block {

    }

    .check-history-block {
      cursor: pointer;

      .ops {
        display: inline-block;
        color: #2c6da5;
        margin: 20px 0;
      }

      .graph {
        width: 100%;
        height: 400px;
        background: aliceblue;
      }
    }

    .bottom-block {
      margin-top: 8px;

      .graph {
        height: 400px;
        background: aliceblue;
      }

      .science {
        display: grid;
        height: 400px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
      }
    }
  }
}

.company {

  .ops-bar {
    background: white;
    padding: 20px;
  }

  .table-block {
    background: white;
    padding: 20px;

  }
}

.layout-center {
  text-align: center;
}

.card {
  width: 100%;
  height: 400px;
  background: white;
}

.item-block {
  margin: 0 20px 20px 20px;
}
</style>
