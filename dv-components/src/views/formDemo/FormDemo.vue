<template>
  <div class="container">
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
        <a-space>
          <a-button type='primary' @click='onSubmit'>Submit</a-button>
          <a-button @click='reset'>Reset</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
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
      formRef.value.validate().then(() => {
        console.log('form submit with model:', form.formModel)
      })
    }
    const reset = () => {
      formRef.value.resetFields()
    }
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
