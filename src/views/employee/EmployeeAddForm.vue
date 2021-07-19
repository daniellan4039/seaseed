<template>
  <cus-form-container title="职工信息表单" description="请填入职工的基本信息">
    <div class="form-block">
      <cus-form :form-def="formDefForNew" :before-submit="beforeSubmit"></cus-form>
    </div>
  </cus-form-container>
</template>

<script>
import CusFormContainer from "@/components/form/CusFormContainer";
import CusForm from "@/components/form/CusForm";
import { formDefForNew } from "@/definition/employee/employeeDef";

export default {
  name: "EmployeeForm",
  components: {
    CusFormContainer, CusForm
  },
  data() {
    return {
      formDefForNew
    }
  },
  methods: {
    beforeSubmit(model) {
      console.log(model)
    }
  }
}
</script>

<style scoped>

</style>
