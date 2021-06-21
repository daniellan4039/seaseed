<template>
  <cus-table-container :def="tableDef.searchParams" @submit="onSubmit">
    <div class="table-block" id='HRMS_TABLE_CONTAINER'>
      <cus-table :table-def="tableDef" :search-model="searchModel" :refresh="refresh">
      </cus-table>
    </div>
  </cus-table-container>
</template>

<script>
import {tableDef} from "@/definition/certification/certificationDef"
import {CusTable, CusTableContainer} from '@/components'
import {ref} from "vue";

export default {
  name: "CertificationTable",
  components: {
    CusTable, CusTableContainer
  },
  setup() {
    let refresh = ref(0)
    const searchModel = ref({})
    const onSubmit = (model) => {
      searchModel.value = model
      refresh.value++
    }
    return {
      tableDef,
      refresh,
      searchModel,
      onSubmit
    }
  }
}
</script>

<style scoped lang="less">

</style>
