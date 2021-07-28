<template>
  <cus-form-container title="档案借阅" description="填写档案借阅信息">
    <div class="form-block">
      <cus-form :form-def="formDef" :before-submit="beforeSubmit"></cus-form>
    </div>
  </cus-form-container>
</template>

<script>
import CusFormContainer from "@/components/form/CusFormContainer";
import CusForm from "@/components/form/CusForm";
import {formDef} from "@/definition/archiveBorrow/archiveBorrowDef";
import store from '@/store'

export default {
  name: "ArchiveBorrowForm",
  components: {
    CusFormContainer, CusForm
  },
  setup(){
    const beforeSubmit = (record) => {
      record['hrArchiveId'] = store.state['employeeStore']['archive'].id
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
