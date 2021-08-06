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
      <a-layout-content class="content-container" id="HRMS_TABLE_CONTAINER">
        <a-tabs :tab-bar-style="{ paddingLeft: '20px', paddingTop: '20px', paddingBottom: '20px', background: 'white'}" class="tabs"
                type="card">
          <a-tab-pane key="new" class="tabs-pane" tab="变动统计">
            <div class="ops-block">
              <span>
                <span>查询范围：</span>
                <cus-date-range v-model="variationRange"/>
                <a-button type="primary" @click="getVariationData">查询</a-button>
              </span>
            </div>
            <div>
              <a-card title="人员变动">
                <div class="emp-change-block layout-center">
                  <div>
                    <icon-card count="0" icon-background="#488bf8" icon-type="iconneibutiaoru" title="内部掉入"/>
                    <icon-card count="0" icon-background="#73deb3" icon-type="iconshehuizhaopin" title="社会招聘"/>
                    <icon-card count="0" icon-background="#f7c739" icon-type="iconxuexiaozhaopin" title="学校招聘"/>
                    <icon-card count="0" icon-background="#488bf8" icon-type="iconjunrenanzhi" title="军人安置"/>
                  </div>
                  <div>
                    <icon-card count="0" icon-background="#488bf8" icon-type="iconjiechuhetong" title="解除合同"/>
                    <icon-card count="0" icon-background="#73deb3" icon-type="icontiaozou" title="调走"/>
                    <icon-card count="0" icon-background="#f7c739" icon-type="icontuixiu" title="退休"/>
                    <icon-card count="0" icon-background="#7585a2" icon-type="iconsiwang" title="死亡"/>
                  </div>
                </div>
<!--                <div class="layout-center check-history-block">-->
<!--                  <span v-show="!showEmpHis" class="ops" @click="onCheckHis">-->
<!--                    <CaretDownOutlined/>-->
<!--                    <span>查看历史变化趋势</span>-->
<!--                  </span>-->
<!--                  <span v-show="showEmpHis" class="ops" @click="onCheckHis">-->
<!--                    <CaretUpOutlined/>-->
<!--                    <span>收起</span>-->
<!--                  </span>-->
<!--                  <div v-show="showEmpHis" class="graph"></div>-->
<!--                </div>-->
              </a-card>
            </div>
            <div class="bottom-block">
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-card title="新增性别比例">
                    <div class="graph">
                      <chart id="sex" :style="{width: '500px', height: '400px'}" :option="sexVariationDataSource"/>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="12">
                  <a-card title="新增职工工龄">
                    <div class="graph">
                      <chart id="age" :style="{width: '500px', height: '400px'}" :option="ageVariationDataSource"/>
                    </div>
                  </a-card>
                </a-col>
<!--                <a-col :span="8">-->
<!--                  <a-card title="科研成果统计" width="200">-->
<!--                    <div class="science">-->
<!--                      <cus-menu-icon :icon-font-style="{fontSize: '110px', color: '#FDBE05'}" icon-type="iconzhigongzhuanli">-->
<!--                        <template #title>-->
<!--                          <div>新增专利数</div>-->
<!--                          <div style="color: #2c6da5;"><span style="font-size: 24px">8</span>项</div>-->
<!--                        </template>-->
<!--                      </cus-menu-icon>-->
<!--                      <cus-menu-icon :icon-font-style="{fontSize: '110px', color: '#66BBEA'}" icon-type="iconkeyanchengguo">-->
<!--                        <template #title>-->
<!--                          <div>新增科研成果</div>-->
<!--                          <div style="color: #2c6da5;"><span style="font-size: 24px">8</span>项</div>-->
<!--                        </template>-->
<!--                      </cus-menu-icon>-->
<!--                      <cus-menu-icon :icon-font-style="{fontSize: '110px', color: '#F15478'}" icon-type="iconzhigongzhicheng">-->
<!--                        <template #title>-->
<!--                          <div>新增职称评定</div>-->
<!--                          <div style="color: #2c6da5;"><span style="font-size: 24px">8</span>项</div>-->
<!--                        </template>-->
<!--                      </cus-menu-icon>-->
<!--                      <cus-menu-icon :icon-font-style="{fontSize: '110px', color: '#14CDBD'}" icon-type="iconxueshulunwen">-->
<!--                        <template #title>-->
<!--                          <div>新增论文</div>-->
<!--                          <div style="color: #2c6da5;"><span style="font-size: 24px">8</span>项</div>-->
<!--                        </template>-->
<!--                      </cus-menu-icon>-->
<!--                    </div>-->
<!--                  </a-card>-->
<!--                </a-col>-->
              </a-row>
              <a-row :gutter="8" style="margin-top: 8px;">
                <a-col :span="12">
                  <a-card title="新增职工学历" width="200">
                    <div class="graph">
                      <chart :option="eduVarSrc" id="edu" :style="{width: '500px', height: '400px'}"/>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="12">
                  <a-card title="新增职工职称" width="200">
                    <div class="graph">
                      <chart :option="proVarSrc" id="pro" :style="{width: '500px', height: '400px'}"/>
                    </div>
                  </a-card>
                </a-col>
              </a-row>
            </div>
          </a-tab-pane>
          <a-tab-pane key="employee" tab="职工统计">
            <div class="item-block">
              <a-card title="人员统计">
                <div class="card">
                  <chart :option="departOption" id="department" :style="{width: '100%', height: '100%'}"/>
                </div>
              </a-card>
            </div>
            <div class="item-block">
              <a-row :gutter="16">
                <a-col :span="8">
                  <a-tabs :tab-bar-style="{margin:0}" type="card">
                    <a-tab-pane key="age" tab="年龄分布">
                      <div class="cus-box-shadow card">
                        <chart :option="oAgeOption" id="oAge" />
                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="sex" tab="性别占比">
                      <div class="cus-box-shadow card">
                        <chart :option="oSexOption" id="oSex" />
                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="edu" tab="学历分布">
                      <div class="cus-box-shadow card">
                        <chart :option="oEduOption" id="oEdu" />
                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="marriage" tab="婚姻状况">
                      <div class="cus-box-shadow card">
                        <chart :option="marriageOption" id="marriage" />
                      </div>
                    </a-tab-pane>
                  </a-tabs>
                </a-col>
                <a-col :span="8">
                  <a-tabs :tab-bar-style="{margin:0}" type="card">
                    <a-tab-pane key="politic" tab="政治面貌">
                      <div class="cus-box-shadow card">
                        <chart :option="politicsOption" id="politics" />
                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="professional" tab="职工职称">
                      <div class="cus-box-shadow card">
                        <chart :option="oProOption" id="oPro" />
                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="workingAge" tab="工龄">
                      <div class="cus-box-shadow card">
                        <chart :option="workAgeOption" id="workAge" />
                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="workingAgeLocal" tab="本企业工龄">
                      <div class="cus-box-shadow card">
                        <chart :option="onBoardAge" id="onBoard" />
                      </div>
                    </a-tab-pane>
                  </a-tabs>
                </a-col>
                <a-col :span="8">
                  <a-tabs :tab-bar-style="{margin:0}" type="card">
                    <a-tab-pane key="empType" tab="职工类型">
                      <div class="cus-box-shadow card">
                        <chart :option="empTypeOption" id="empType" />
                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="empSource" tab="职工来源">
                      <div class="cus-box-shadow card">
                        <chart :option="sourceOption" id="source" />
                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="empStatus" tab="职工状态">
                      <div class="cus-box-shadow card">
                        <chart :option="stateOption" id="state" />
                      </div>
                    </a-tab-pane>
                    <a-tab-pane key="empContractType" tab="职工合同类型">
                      <div class="cus-box-shadow card">
                        <chart :option="contractOption" id="contract" />
                      </div>
                    </a-tab-pane>
                  </a-tabs>
                </a-col>
              </a-row>
            </div>
          </a-tab-pane>
          <a-tab-pane key="company" class="company" tab="全部人员">
            <div class="ops-bar item-block">
              <a-input-search placeholder="请输入职工姓名" style="width: 200px" @search="searchEmpName"/>
            </div>
            <div class="table-block item-block">
              <cus-table :table-def="tableDef" :use-default-pagination="true" :auto-adopt="false" :show-action-col="false"
                         :search-model="employeeName" :refresh="empTbFresh"></cus-table>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import {computed, ref, watch} from "vue";
// eslint-disable-next-line no-unused-vars
import {companyApi, departmentApi, employeeApi} from "@/service";
import {convertArrayToTree} from "@/funcLib/arrayFunc";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons-vue";
import CusDateRange from "@/components/form/date/CusDateRange";
import IconCard from "@/views/statistic/components/IconCard";
import {getEmployeeInfo, getVariation} from "@/service/statisticApi";
import Chart from "@/views/statistic/components/Chart";
import {
  getAgeOption,
  getEduOption,
  getMarriage, getOAgeOption, getOEduOption, getOProOption, getOSexOption,
  getProOption,
  getSexOption, parseOption,
  setBarOption, tableDef
} from "@/views/statistic/components/config";
import CusTable from "@/components/table/CusTable";

export default {
  name: "Statistic",
  components: {
    CusTable,
    // eslint-disable-next-line vue/no-unused-components
    CusDateRange, IconCard, CaretUpOutlined, CaretDownOutlined,
    Chart
  },
  setup: function () {
    const companyOrigin = []
    const companyData = ref([])
    const companyMap = ref({})
    const departData = ref([])
    const expandedComKeys = ref([])
    const keywords = ref()
    const empOfCompanySource = ref([])
    const showEmpHis = ref(false)
    const variationRange = ref([])
    const selectedCompanyId = ref()
    const selectedDepartId = ref()
    const employeeName = ref()
    const empTbFresh = ref(1)

    const statisticDataSource = ref()
    const variationDataSource = ref()
    const sexVariationDataSource = ref(getSexOption())
    const ageVariationDataSource = ref(getAgeOption())
    const eduVarSrc = ref(getEduOption())
    const proVarSrc = ref(getProOption())
    const oAgeOption = ref(getOAgeOption())
    const oSexOption = ref(getOSexOption())
    const oEduOption = ref(getOEduOption())
    const politicsOption = ref(setBarOption())
    const oProOption = ref(getOProOption())
    const workAgeOption = ref(setBarOption())
    const onBoardAge = ref(setBarOption())
    const empTypeOption = ref(setBarOption())
    const sourceOption = ref(setBarOption())
    const stateOption = ref(setBarOption())
    const contractOption = ref(setBarOption())
    const marriageOption = ref(getMarriage())
    const departOption = ref(setBarOption())

    // arg是包含点击节点的key的数组
    const onCompanySelect = (arg, even) => {
      if (arg.length) {
        const _type = even.selectedNodes[0].props._type
        switch (_type) {
          case 1:
            selectedCompanyId.value = arg[0]
            selectedDepartId.value = null
            getVariationData()
            setEmployeeStatistic(selectedCompanyId.value, selectedDepartId.value, '*')
            searchEmpName()
            break
          case 2:
            selectedDepartId.value = arg[0]
            getVariationData()
            setEmployeeStatistic(selectedCompanyId.value, selectedDepartId.value, '*')
            searchEmpName()
            break
          case 3:
            break
          case 4:
            break
        }
      }
      expandedComKeys.value = [...arg, ...expandedComKeys.value]
    }

    const setEmployeeStatistic = (companyId, departId, codes) => {
      getEmployeeInfo(codes, companyId, departId).then(res => {
        const {isSuccess, data} = res
        if (isSuccess) {
          statisticDataSource.value = data
          // eslint-disable-next-line no-unused-vars
          const {contract_contract_type, emp_age, emp_all_working_age, emp_company, emp_depart, emp_education, emp_emp_status,
            // eslint-disable-next-line no-unused-vars
            emp_emp_type, emp_entry_channel, emp_local_working_age, emp_marriage_status, emp_politics_status, emp_professional, emp_sex}
              = data
          contractOption.value = parseOption(contract_contract_type, 'bar')
          oAgeOption.value = parseOption(emp_age, 'bar')
          workAgeOption.value = parseOption(emp_all_working_age, 'bar')
          onBoardAge.value = parseOption(emp_local_working_age, 'bar')
          oEduOption.value = parseOption(emp_education, 'bar')
          stateOption.value = parseOption(emp_emp_status, 'pie', '职工状态', '在职')
          empTypeOption.value = parseOption(emp_emp_type, 'pie', '职工类型', '在职')
          marriageOption.value = parseOption(emp_marriage_status, 'pie', '职工婚姻', '在职')
          politicsOption.value = parseOption(emp_politics_status, 'bar')
          oProOption.value = parseOption(emp_professional, 'bar')
          oSexOption.value=parseOption(emp_sex, 'pie', '职工性别', '在职')
          departOption.value = parseOption(emp_depart, 'bar')
          sourceOption.value = parseOption(emp_entry_channel, 'bar')
        }
      })
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
              data[i]._type = 1
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
              data[i]._type = 2 // 2为部门
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
              _type: 4,
              children: []
            })
          }
          if (subComIndex === -1) {
            parent.children.push({
              name: '分子公司',
              id: 'sub_com'.concat(parent.id),
              type: 'subCom',
              _type: 3,
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

    const getVariationData = () => {
      let from, to
      if (variationRange.value.length && variationRange.value.length) {
        from = variationRange.value[0]
        to = variationRange.value[1]
      }
      getVariation(from, to, selectedCompanyId.value, selectedDepartId.value).then(res => {
        const {isSuccess, data} = res
        if (isSuccess) {
          variationDataSource.value = data
        }
      })
    }

    const setGraphOption = (data) => {
      const keys = []
      const values = []
      for (let dataKey in data) {
        keys.push(dataKey)
        values.push(data[dataKey])
      }
      return {keys, values}
    }

    const searchEmpName = (value) => {
      employeeName.value = {
        realName: value,
        companyId: selectedCompanyId.value,
        departmentId: selectedDepartId.value
      }
      empTbFresh.value++
    }

    watch(variationDataSource, (nv) => {
      const {sex, age, education, profession} = nv
      sexVariationDataSource.value.series[0].data = [{name: '男性', value: sex['男性']}, {name: '女性', value: sex['女性']}]
      ageVariationDataSource.value.series[0].data = age.map(i => Number(i.size))

      const eduOption = setGraphOption(education)
      const proOption = setGraphOption(profession)

      eduVarSrc.value.xAxis.data = eduOption.keys
      eduVarSrc.value.series[0].data = eduOption.values

      proVarSrc.value.xAxis.data = proOption.keys
      proVarSrc.value.series[0].data = proOption.values
    }, {deep: true})

    setCompany()

    return {
      tableDef,
      empTbFresh,
      employeeName,
      marriageOption,
      oAgeOption,
      oSexOption,
      oEduOption,
      politicsOption,
      oProOption,
      workAgeOption,
      onBoardAge,
      empTypeOption,
      sourceOption,
      stateOption,
      contractOption,
      departOption,
      eduVarSrc,
      proVarSrc,
      sexVariationDataSource,
      ageVariationDataSource,
      companyData,
      companyTree,
      departData,
      expandedComKeys,
      keywords,
      empOfCompanySource,
      showEmpHis,
      variationRange,
      onCompanySelect,
      setCompany,
      setDepart,
      getCompanyTree,
      onSearch,
      onCheckHis,
      getVariationData,
      selectedCompanyId,
      selectedDepartId,
      setEmployeeStatistic,
      searchEmpName
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
  max-height: 100vh;
  overflow-y: auto;
  .sticky-block {
    position: sticky;
    top: 0;
    left: 2px;
    right: 2px;
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
      display: flex;
      justify-content: space-around;
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
        //background: aliceblue;
      }
    }

    .bottom-block {
      margin-top: 8px;
      .graph {
        height: 400px;
        display: flex;
        justify-content: center;
        //background: aliceblue;
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
  display: flex;
  flex-direction: column;
  .ops-bar {
    background: white;
    padding: 20px;
  }

  .table-block {
    background: white;
    padding: 20px;
    flex-grow: 2;
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
