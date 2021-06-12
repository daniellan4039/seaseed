<template>
  <cus-table-container :def="tableDef.searchParams">
    <div class="table-block">
      <cus-table :table-def="tableDef"></cus-table>
    </div>
  </cus-table-container>
</template>

<script>
import {tableDef} from "@/definition/employee/employeeDef"
import {CusTable, CusTableContainer} from '@/components'

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
