<template>
  <div class="container">
    <a-divider></a-divider>
    <a-form ref="formRef" :model="form.formModel" :rules="form.rules"
            :label-col="{span:6}" :wrapper-col="{span: 12}">
      <a-form-item label="User Name" name="userName">
        <a-input v-model:value="form.formModel.userName" />
      </a-form-item>
      <a-form-item label="Department" name="departmentId" v-if="form.formMap['departmentId'].visible">
        <a-select v-model:value="form.formModel.departmentId"
                  :options="form.formMap['departmentId'].options"></a-select>
      </a-form-item>
      <a-form-item label="Sex" name="sex" v-if="form.formMap['sex'].visible">
        <a-select v-model:value="form.formModel.sex" :options="form.formMap['sex'].options"></a-select>
      </a-form-item>
      <a-form-item label="Nickname" name="nickName">
        <a-input v-model:value="form.formModel.nickName" />
      </a-form-item>
      <a-form-item label='Action'>
        <a-button type='primary' @click='onSubmit'>Submit</a-button>
        <a-button @click='reset'>Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reactive, ref, watch } from 'vue'
import newForm from './config/formConfig'

export default {
  name: 'FormDemo',
  setup(){
    const form = reactive(newForm)
    const formRef = ref()
    watch(form.formModel, () => {
      form.refreshDependency()
    })
    const onSubmit = () => {
      form.submit(formRef)
    }
    const reset = () => {
      form.resetForm(formRef)
    }
    console.log(form)
    return{
      form,
      formRef,
      onSubmit,
      reset
    }
  }
}
</script>

<style scoped>
.container{
  padding: 30px;
}
</style>
