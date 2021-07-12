<template>
  <cus-table-container :def="tableDef.searchParams" @submit="onSubmit">
    <div class="table-block" id='HRMS_TABLE_CONTAINER'>
      <cus-table :table-def="tableDef" :search-model="searchModel" :refresh="refresh">
        <template #otherOps>
<!--          <a-button type="default" style="margin-left: 8px;">批量导入</a-button>-->
          <span style="margin-left: 5px;">
            <cus-upload text="批量上传" :enable-upload="false" :show-upload-list="false" :custom-request="uploadFile"/>
          </span>
        </template>
      </cus-table>
    </div>
  </cus-table-container>
</template>

<script>
import {tableDef} from "@/definition/employee/employeeDef"
import {CusTable, CusTableContainer, CusUpload} from '@/components'
import {ref} from "vue";

export default {
  name: "EmployeeInfo",
  components: {
    CusTable, CusTableContainer, CusUpload
  },
  setup () {
    let refresh = ref(0)
    const searchModel = ref({})
    const onSubmit = (model) => {
      searchModel.value = model
      refresh.value++
    }

    const uploadFile = ({file}) => {
      console.log(file)
    }

    return {
      tableDef,
      refresh,
      searchModel,
      onSubmit,
      uploadFile
    }
  }
}
</script>

<style scoped lang="less">

</style>
