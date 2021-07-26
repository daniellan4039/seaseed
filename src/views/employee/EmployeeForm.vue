<template>
  <cus-form-container title="职工信息表单" description="请填入职工的基本信息">
    <div class="form-block">
      <cus-form :form-def="formDef" :before-submit="beforeSubmit"></cus-form>
    </div>
  </cus-form-container>
</template>

<script>
import CusFormContainer from "@/components/form/CusFormContainer";
import CusForm from "@/components/form/CusForm";
import { formDef } from "@/definition/employee/employeeDef";

export default {
  name: "EmployeeForm",
  components: {
    CusFormContainer, CusForm
  },
  data() {
    return {
      formDef
    }
  },
  methods: {
    beforeSubmit(model) {
      model.avatar = model.fileList?.[0].attachment
      console.log(model)
    }
  }
}
</script>

<style scoped>

</style>
