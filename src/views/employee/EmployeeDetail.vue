<template>
  <cus-form-container description="查看职工详细信息" title="职工详情">
    <div class="form-block">
      <cus-description :formDef="formDef"></cus-description>
    </div>
  </cus-form-container>
</template>

<script>
import CusFormContainer from "@/components/form/CusFormContainer";
import CusDescription from "@/components/form/CusDescription";
import {formDef} from '@/definition/employee/employeeDef'

export default {
  name: "EmployeeDetail",
  components: {
    CusFormContainer, CusDescription
  },
  setup() {
    return {
      formDef
    }
  }
}
</script>

<style scoped>

</style>
