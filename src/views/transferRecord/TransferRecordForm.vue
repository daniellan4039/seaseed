<template>
  <cus-form-container title="职工调度" description="请填写相关信息">
    <div class="form-block">
      <cus-form :form-def="formDef"></cus-form>
    </div>
  </cus-form-container>
</template>

<script>
import CusFormContainer from "@/components/form/CusFormContainer";
import CusForm from "@/components/form/CusForm";
import {formDef} from "@/definition/transferRecord/transferRecordDef";

export default {
  name: "TransferRecord",
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
