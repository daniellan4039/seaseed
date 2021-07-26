<template>
  <cus-table-container :def="tableDef.searchParams" @submit="onSubmit">
    <div class="table-block" id='HRMS_TABLE_CONTAINER'>
      <cus-table :table-def="tableDef" :search-model="searchModel" :refresh="refresh">
        <template #otherOps>
          <a-button type="default" style="margin-left: 8px;" @click="uploadFile">批量导入</a-button>
        </template>
        <template #actionExt="{record}">
          <a @click="onDistribute(record)">调出</a>
        </template>
      </cus-table>
    </div>
  </cus-table-container>
</template>

<script>
import {tableDef} from "@/definition/employee/employeeDef"
import {CusTable, CusTableContainer} from '@/components'
import {ref} from "vue";
import router from "@/router";
import store from '@/store/index'

export default {
  name: "EmployeeInfo",
  components: {
    CusTable, CusTableContainer
  },
  setup () {
    let refresh = ref(0)
    const searchModel = ref({})
    const onSubmit = (model) => {
      searchModel.value = model
      refresh.value++
    }

    const uploadFile = () => {
      router.push({
        path: '/employee/import'
      })
    }

    const onDistribute = (record) => {
      const emp = {
        employeeId: record.id
      }
      store.dispatch('setTransferRecord', emp)
      router.push({
        path: '/transferRecord/Form'
      })
    }

    return {
      tableDef,
      refresh,
      searchModel,
      onSubmit,
      uploadFile,
      onDistribute
    }
  }
}
</script>

<style scoped lang="less">

</style>
