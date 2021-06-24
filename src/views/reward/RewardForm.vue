<template>
  <cus-form-container title="奖惩表单" description="请输入奖惩信息详细">
    <div class="form-block">
      <cus-form :form-def="formDef"></cus-form>
    </div>
  </cus-form-container>
</template>

<script>
import CusFormContainer from "@/components/form/CusFormContainer";
import CusForm from "@/components/form/CusForm";
import {formDef} from "@/definition/reward/rewardDef";

export default {
  name: "RewardForm",
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
