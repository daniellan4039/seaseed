<template>
  <cus-table-container :def="tableDef.searchParams" @submit="onSubmit">
    <div class="table-block" id='HRMS_TABLE_CONTAINER'>
      <cus-table :table-def="tableDef" :search-model="searchModel" :refresh="refresh" :extra-actions="extraActions">
        <template #otherOps>
          <a-button type="default" style="margin-left: 8px;">高级搜索</a-button>
          <a-button type="default" style="margin-left: 8px;" @click="uploadFile">批量导入</a-button>
        </template>
      </cus-table>
      <a-modal title="高级搜索" v-model:visible="showMore">
        <cus-table :table-def="searchMoreDef"></cus-table>
      </a-modal>
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
    const extraActions = ref([])
    const showMore = ref(false)
    const onSubmit = (model) => {
      searchModel.value = model
      refresh.value++
    }

    const uploadFile = () => {
      router.push({
        path: '/employee/import'
      })
    }

    const onDistribute = ({record}) => {
      const emp = {
        employeeId: record.id,
        _edit: 0
      }
      store.dispatch('setTransferRecord', emp)
      router.push({
        path: '/transferRecord/Form'
      })
    }

    extraActions.value = [
      {
        name: '调出',
        onClick: onDistribute
      }
    ]

    return {
      tableDef,
      refresh,
      searchModel,
      extraActions,
      showMore,
      onSubmit,
      uploadFile,
      onDistribute
    }
  }
}
</script>

<style scoped lang="less">

</style>
