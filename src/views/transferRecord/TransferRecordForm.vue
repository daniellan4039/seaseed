<template>
  <cus-form-container title="职工调度" description="请填写相关信息">
    <div class="form-block">
      <cus-form :form-def="formDef" :before-submit="beforeSubmit"></cus-form>
    </div>
  </cus-form-container>
</template>

<script>
import CusFormContainer from "@/components/form/CusFormContainer";
import CusForm from "@/components/form/CusForm";
import {formDef} from "@/definition/transferRecord/transferRecordDef";
import store from "@/store";

export default {
  name: "TransferRecord",
  components: {
    CusFormContainer, CusForm
  },
  setup () {
    const beforeSubmit = (record) => {
      record.employeeId = store.state['employeeStore']['transferRecord'].employeeId
    }
    return {
      beforeSubmit
    }
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
