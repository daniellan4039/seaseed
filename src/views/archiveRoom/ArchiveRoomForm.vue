<template>
  <cus-form-container title="档案室表单" description="请输入档案室详细内容">
    <div class="form-block">
      <cus-form :form-def="formDef"></cus-form>
    </div>
  </cus-form-container>
</template>

<script>
import CusFormContainer from "@/components/form/CusFormContainer";
import CusForm from "@/components/form/CusForm";
import {formDef} from "@/definition/archiveRoom/archiveRoomDef";

export default {
  name: "ArchiveRoomForm",
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
