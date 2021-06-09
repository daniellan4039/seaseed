<template>
  <cus-table-container>
    <div class="table">
      <cus-table :table-def="tableDef"></cus-table>
    </div>
  </cus-table-container>
</template>

<script>
import CusTable from '@/components/CusTable'
import {tableDef} from "@/definition/employee/employeeCenter"
import CusTableContainer from '@/components/CusTableContainer'

export default {
  name: "EmployeeInfo",
  components: {
    CusTable, CusTableContainer
  },
  setup () {
    return {
      tableDef
    }
  }
}
</script>

<style scoped lang="less">

</style>
