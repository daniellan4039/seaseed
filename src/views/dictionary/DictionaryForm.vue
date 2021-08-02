<template>
  <cus-form-container title="字典表单" description="请在此输入子店详细信息">
    <div class="form-block">
      <cus-form :form-def="formDef" :before-submit="beforeSubmit"></cus-form>
    </div>
  </cus-form-container>
</template>

<script>
import CusFormContainer from "@/components/form/CusFormContainer";
import CusForm from "@/components/form/CusForm";
import {formDef} from "@/definition/dictionary/dictionaryDef";
import store from '@/store'

export default {
  name: "DictionaryForm",
  components: {
    CusFormContainer, CusForm
  },
  setup() {
    const beforeSubmit = (record, state) => {
      const storeDic = store.state.employeeStore.parentDictionary
      if (storeDic) {
        if (state) {
          record.dictCode = storeDic.dictCode
        } else {
          record.parentCode = storeDic.dictCode
          record.parentName = storeDic.dictName
        }
      }
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
