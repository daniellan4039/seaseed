<template>
  <div class="container">
    <a-form ref="formRef" :rules="firstFormDefRef.rules" :model="firstFormDefRef.formModel"
            :label-col="{span:6}" :wrapper-col="{span: 12}">
      <a-form-item label="User Name" name="userName">
        <a-input v-model:value="firstFormDefRef.formModel.userName" />
      </a-form-item>
      <a-form-item label="Department" name="departmentId" v-if="firstFormDefRef.formMap['departmentId'].visible">
        <a-select v-model:value="firstFormDefRef.formModel.departmentId"
                  :options="firstFormDefRef.formMap['departmentId'].options"></a-select>
      </a-form-item>
      <a-form-item label="Sex" name="sex" v-if="firstFormDefRef.formMap['sex'].visible">
        <a-select v-model:value="firstFormDefRef.formModel.sex" :options="firstFormDefRef.formMap['sex'].options"></a-select>
      </a-form-item>
      <a-form-item label="Nickname" name="nickName">
        <a-input v-model:value="firstFormDefRef.formModel.nickName" />
      </a-form-item>
      <a-form-item label='Action'>
        <a-button type='primary' @click='onSubmit'>Submit</a-button>
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
    console.log(firstFormDef)
    const firstFormDefRef = reactive(firstFormDef)
    const formRef = ref()

    const onSubmit = () => {
      firstFormDefRef.submit(formRef)
    }

    watch(firstFormDefRef.formModel, () => {
      firstFormDefRef.dependenceChange()
    })

    return{
      formRef,
      firstFormDefRef,
      onSubmit
    }
  }
}
</script>

<style scoped>
.container{
  padding: 30px;
}
</style>
