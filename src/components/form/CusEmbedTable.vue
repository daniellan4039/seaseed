<template>
  <a-modal :visible="visible" width="1000px" @cancel="onCancel">
    <div>
      <a-form>
        <a-row :gutter="16">
          <a-col :span="6" v-for="(formItem, formItemIndex) in searchDef.formItems" :key="formItemIndex" class='search-actions-block'>
            <a-form-item :label="formItem.label" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <a-input :placeholder="formItem.placeholder"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row >
          <a-col offset="20" span="4" style="display: flex; justify-content: flex-end;margin-bottom: 3px;">
            <a-space>
              <a-button type="primary">搜索</a-button>
              <a-button>重置</a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div>
      <a-table :columns="tableDef.columns"></a-table>
    </div>
  </a-modal>
</template>

<script>

import CusFormInput from "@/components/form/CusFormInput";

export default {
  name: "CusEmbedTable",
  props: ['searchDef', 'tableDef', 'visible'],
  emits: ['update'],
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CusFormInput
  },
  setUp () {
  },
  methods: {
    onCancel () {
      this.$emit('update', false)
    }
  }
}
</script>

<style scoped lang="less">
.ant-form-item{
  margin-bottom: 0px;
}
</style>
