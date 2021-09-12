<template>
  <div class="container">
    <a-divider></a-divider>
    <a-form ref="secFormRef" :model="secForm.formModel"
            :label-col="{span:6}" :wrapper-col="{span: 12}">
      <a-form-item label="User Name" name="userName">
        <a-input v-model:value="secForm.formModel.userName" />
      </a-form-item>
      <a-form-item label="Department" name="departmentId" v-if="secForm.formMap['departmentId'].visible">
        <a-select v-model:value="secForm.formModel.departmentId"
                  :options="secForm.formMap['departmentId'].options"></a-select>
      </a-form-item>
      <a-form-item label="Sex" name="sex" v-if="secForm.formMap['sex'].visible">
        <a-select v-model:value="secForm.formModel.sex" :options="secForm.formMap['sex'].options"></a-select>
      </a-form-item>
      <a-form-item label="Nickname" name="nickName">
        <a-input v-model:value="secForm.formModel.nickName" />
      </a-form-item>
<!--      <a-form-item label='Action'>-->
<!--        <a-button type='primary' @click='onSubmit'>Submit</a-button>-->
<!--      </a-form-item>-->
    </a-form>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reactive, ref, watch } from 'vue'
import newForm from './config/newFormConfig'

export default {
  name: 'FormDemo',
  setup(){
    const secForm = reactive(newForm)
    const secFormRef = ref()
    watch(secForm.formModel, () => {
      secForm.refreshDependency()
    })

    console.log(secForm)
    return{
      secForm,
      secFormRef
    }
  }
}
</script>

<style scoped>
.container{
  padding: 30px;
}
</style>
