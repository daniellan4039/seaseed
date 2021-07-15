<template>
  <cus-form-container description="" title="">
    <div class="form-block">
      <cus-description :formDef="formDef"></cus-description>
    </div>
  </cus-form-container>
</template>

<script>
import CusFormContainer from "@/components/form/CusFormContainer";
import CusDescription from "@/components/form/CusDescription";
import {formDef} from '@/definition/transferRecord/transferRecordDef'

export default {
  name: "TransferRecordDetail",
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
