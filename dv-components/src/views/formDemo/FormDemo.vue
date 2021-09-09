<template>
  <div class="container">
    <a-form :ref="firstFormDefRef.formRef"
            :rules="firstFormDefRef.rules"
            v-model:model="formModel"
            :label-col="{span:6}" :wrapper-col="{span: 12}">
      <a-form-item label="User Name" name="userName">
        <a-input v-model:value="formModel.userName" />
      </a-form-item>
      <a-form-item label="Gender" name="sex">
        <a-select v-model:value="formModel.sex"></a-select>
      </a-form-item>
      <a-form-item :label="formMap.departmentId.name" name="departmentId"
                   v-if="formMap.departmentId.visible">
        <a-select v-model:value="formModel.departmentId" :options="firstFormDefRef.formMap.departmentId.options"></a-select>
      </a-form-item>
      <a-form-item :label="formMap.nickName.name" name="nickName">
        <a-input v-model:value="formModel.nickName" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reactive, ref, watch } from 'vue'
import firstFormDef from './config/formConfig'

export default {
  name: 'FormDemo',
  setup(){
    const firstFormDefRef = reactive(firstFormDef)
    console.log(firstFormDefRef)

    watch(firstFormDefRef.formModel, () => {
      firstFormDefRef.dependenceChange()
      console.log(firstFormDefRef)
    })

    return{
      firstFormDefRef,
      formModel: firstFormDefRef.formModel,
      formMap: firstFormDefRef.formMap
    }
  }
}
</script>

<style scoped>
.container{
  padding: 30px;
}
</style>
