<template>
  <cus-form-container title="职工履历" description="请在这里输入履历信息">
    <div class="form-block">
      <cus-form :form-def="formDef"></cus-form>
    </div>
  </cus-form-container>
</template>

<script>
import CusFormContainer from "@/components/form/CusFormContainer";
import CusForm from "@/components/form/CusForm";
import {formDef} from "@/definition/resume/resumeDef";

export default {
  name: "ResumeForm",
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
