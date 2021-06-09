<template>
  <cus-form-container title="职工信息表单" description="请填入职工的基本信息">
    <div class="form-block">
      <cus-form></cus-form>
    </div>
  </cus-form-container>
</template>

<script>
import CusFormContainer from "@/components/CusFormContainer";
import CusForm from "@/components/CusForm";

export default {
  name: "EmployeeForm",
  components: {
    CusFormContainer, CusForm
  }
}
</script>

<style scoped>

</style>
