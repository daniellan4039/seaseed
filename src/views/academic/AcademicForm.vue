<template>
  <cus-form-container title="科研成果" description="请完善科研成果信息">
    <div class="form-block">
      <cus-form :form-def="formDef"></cus-form>
    </div>
  </cus-form-container>
</template>

<script>
import CusFormContainer from "@/components/form/CusFormContainer";
import CusForm from "@/components/form/CusForm";
import {formDef} from "@/definition/academic/academicDef";

export default {
  name: "AcademicForm",
  components: {
    CusFormContainer, CusForm
  },
  data() {
    return {
      formDef
    }
  }
}
</script>

<style scoped>

</style>
