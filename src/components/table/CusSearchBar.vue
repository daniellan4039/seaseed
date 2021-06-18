<template>
  <div class="search-block">
    <a-form ref="formRef" :model="formModel">
      <a-row :gutter="18">
        <a-col v-for="(formItem, formItemIndex) in formDef?.formItems" :key="formItemIndex" :span="6">
          <a-form-item :name="formItem.key" :ref="formItem.key" :label="formItem.label" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
            <cus-form-input :item="formItem" v-model="formModel[formItem.key]"></cus-form-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col class='search-actions-block' offset='20' span='4'>
          <a-space align='end'>
            <a-button type='primary' @click="submitForm">搜索</a-button>
            <a-button @click="resetForm">重置</a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import CusFormInput from "@/components/form/CusFormInput";
import {reactive, ref} from "vue";
import {Modal} from "ant-design-vue";

export default {
  name: "CusSearchBar",
  props: {
    formDef: {
      type: Object,
      required: true
    },
  },
  emits: ['submit'],
  components: {
    CusFormInput
  },
  setup(props, ctx) {
    let refresh = ref(0)
    const formRef = ref()
    const parseFormModel = (formItems) => {
      let formModel = {}
      if (formItems instanceof Array) {
        formItems.forEach(i => {
          formModel[i.key] = i?.default
        })
      }
      return formModel
    }
    let formModel = reactive(parseFormModel(props.formDef.formItems))
    const submitForm = () => {
      formRef.value.validate().then(() => {
        ctx.emit('submit', formModel)
      }).catch(() => {
        Modal.error({
          title: '提示',
          content: '请完善表格'
        })
      })
    }
    const resetForm = () => {
      formRef.value.resetFields();
    }
    return {
      formRef,
      formModel,
      refresh,
      parseFormModel,
      submitForm,
      resetForm
    }
  }
}
</script>

<style scoped>

</style>
