<template>
  <cus-form-container>
    <div class="form-block">
      <div class="basic-block">
        <cus-description :formDef="empFormDef"></cus-description>
      </div>
      <div class="user-pic">
        <a-image :height="160" :width="117" :src="avatorUrl"/>
      </div>
      <div class="info">
        <img v-if="employee?.transferRecordList?.length > 0" src="@/assets/transfered.png">
      </div>
      <a-divider type="horizontal" />
      <div class="other-block">
        <a-tabs tab-position="left">
          <a-tab-pane key="distribute" tab="职工分配">
            <cus-table :search-model="searchModel" :use-default-pagination="true" :table-def="distributeTableDef">
            </cus-table>
          </a-tab-pane>
          <a-tab-pane key="certification" tab="职工证书">
            <cus-table :search-model="searchModel" :use-default-pagination="true" :table-def="certTableDef"></cus-table>
          </a-tab-pane>
          <a-tab-pane key="family" tab="职工家庭">
            <cus-table :search-model="searchModel" :use-default-pagination="true" :table-def="familyTableDef"></cus-table>
          </a-tab-pane>
          <a-tab-pane key="education" tab="职工教育">
            <cus-table :search-model="searchModel" :use-default-pagination="true" :table-def="eduTableDef"></cus-table>
          </a-tab-pane>
          <a-tab-pane key="resume" tab="职工履历">
            <cus-table :search-model="searchModel" :use-default-pagination="true" :table-def="resumeTableDef"></cus-table>
          </a-tab-pane>
          <a-tab-pane key="archive" tab="职工档案">
            <cus-table :search-model="searchModel" :use-default-pagination="true" :table-def="archiveTableDef"></cus-table>
          </a-tab-pane>
          <a-tab-pane key="soldier" tab="复转军人">
            <cus-table :search-model="searchModel" :use-default-pagination="true" :table-def="soldierTableDef"></cus-table>
          </a-tab-pane>
          <a-tab-pane key="thesis" tab="学术论文">
            <cus-table :search-model="searchModel" :use-default-pagination="true" :table-def="thesisTableDef"></cus-table>
          </a-tab-pane>
          <a-tab-pane key="academic" tab="科研成果">
            <cus-table :search-model="searchModel" :use-default-pagination="true" :table-def="academicTableDef"></cus-table>
          </a-tab-pane>
          <a-tab-pane key="train" tab="职工培训">
            <cus-table :search-model="searchModel" :use-default-pagination="true" :table-def="trainTableDef"></cus-table>
          </a-tab-pane>
          <a-tab-pane key="reward" tab="职工奖惩">
            <cus-table :search-model="searchModel" :use-default-pagination="true" :table-def="rewardTableDef"></cus-table>
          </a-tab-pane>
          <a-tab-pane key="contract" tab="职工合同">
            <cus-table :search-model="searchModel" :use-default-pagination="true" :table-def="contractTableDef"></cus-table>
          </a-tab-pane>
          <a-tab-pane key="language" tab="职工语言">
            <cus-table :search-model="searchModel" :use-default-pagination="true" :table-def="langTableDef"></cus-table>
          </a-tab-pane>
          <a-tab-pane key="patent" tab="职工专利">
            <cus-table :search-model="searchModel" :use-default-pagination="true" :table-def="patentTableDef"></cus-table>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </cus-form-container>
</template>

<script>
import CusFormContainer from "@/components/form/CusFormContainer";
import CusDescription from "@/components/form/CusDescription";
import {formDef as empFormDef} from '@/definition/employee/employeeDef'
import {tableDef as distributeTableDef} from '@/definition/distribute/distributeDef'
import {tableDef as certTableDef} from '@/definition/certification/certificationDef'
import {tableDef as familyTableDef} from '@/definition/family/familyDef'
import {tableDef as eduTableDef} from '@/definition/education/educationDef'
import {tableDef as resumeTableDef} from '@/definition/resume/resumeDef'
import {tableDef as archiveTableDef} from '@/definition/archive/archiveDef'
import {tableDef as soldierTableDef} from '@/definition/soldier/soldierDef'
import {tableDef as thesisTableDef} from '@/definition/thesis/thesisDef'
import {tableDef as academicTableDef} from '@/definition/academic/academicDef'
import {tableDef as trainTableDef} from '@/definition/train/trainDef'
import {tableDef as rewardTableDef} from '@/definition/reward/rewardDef'
import {tableDef as contractTableDef} from '@/definition/contract/contractDef'
import {tableDef as langTableDef} from '@/definition/language/languageDef'
import {tableDef as patentTableDef} from '@/definition/patent/patentDef'
import CusTable from "@/components/table/CusTable";
import {ref} from "vue";
import store from "@/store";
import {employeeApi} from "@/service";
import {get} from "@/service/uploadApi";

export default {
  name: "EmployeeDetail",
  components: {
    CusTable,
    CusFormContainer, CusDescription
  },
  setup() {
    const searchModel = ref({})
    const avatorUrl = ref('')
    let employee = ref(store.state.employeeStore.employee)
    if (!employee.value) {
      const currentUsr = JSON.parse(localStorage.getItem('HRMS_USER'))
      employeeApi.get({id: currentUsr.userId}).then(res => {
        employee.value = res.data
      })
    }
    employee.value?.avatar && get(employee.value.avatar).then(res => {
      avatorUrl.value = res.data[0]
    })
    searchModel.value.employeeId = employee.value?.id??0

    return {
      empFormDef,
      distributeTableDef,
      certTableDef,
      familyTableDef,
      eduTableDef,
      resumeTableDef,
      archiveTableDef,
      soldierTableDef,
      thesisTableDef,
      academicTableDef,
      trainTableDef,
      rewardTableDef,
      contractTableDef,
      langTableDef,
      patentTableDef,
      employee,
      avatorUrl,
      searchModel
    }
  }
}
</script>

<style scoped>
.form-block{
  position: relative;
}
.basic-block {
  padding-right: 200px;
  position: relative;
}

.user-pic {
  position: absolute;
  top: 45px;
  right: 45px;
}

.info {
  position: absolute;
  top: 140px;
  right: 80px;
}

.other-block {
  margin-top: 20px;
}

@media only screen and (max-width: 200px) {
  .form-block {
    padding-right: 400px;
  }
}
</style>
