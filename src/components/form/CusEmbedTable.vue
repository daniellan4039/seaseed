<template>
  <a-modal :visible="visible" width="1000px" @cancel="onCancel" @ok="onOk">
    <div class="cus-embed-table-header">
      <a-form ref="formRef" :model="formModel">
        <a-row :gutter="16">
          <a-col v-for="(formItem, formItemIndex) in searchDef.formItems" :key="formItemIndex" :span="6"
                 class='search-actions-block'>
            <a-form-item :name="formItem.key" :ref="formItem.key" :label="formItem.label" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <cus-base-input :item="formItem" v-model="formModel[formItem.key]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col offset="20" span="4" style="display: flex; justify-content: flex-end;margin-bottom: 3px;">
            <a-space>
              <a-button type="primary" @click="submitForm">搜索</a-button>
              <a-button @click="resetForm">重置</a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div>
      <cus-table :config="tableConfig" :ops-bar-visible="false" :table-def="tableDef" :search-model="formModel"
                 :refresh="refresh" :adapt-height="false"/>
    </div>
  </a-modal>
</template>

<script>
import {reactive, ref} from "vue";
import CusTable from "@/components/table/CusTable";
import CusBaseInput from "@/components/form/select/CusBaseInput";
import {Modal} from "ant-design-vue";

export default {
  name: "CusEmbedTable",
  props: ['searchDef', 'tableDef', 'visible'],
  emits: ['update', 'selected'],
  components: {
    CusTable, CusBaseInput
  },
  setup(props) {
    let selectedKeys = ref([])
    let selectedRows = ref([])
    let searchModel = ref({})
    let refresh = ref(0)

    const formRef = ref()

    const onSelectChange = (keys, rows) => {
      selectedKeys.value = keys
      selectedRows.value = rows
    }

    const parseFormModel = (formItems) => {
      let formModel = {}
      if (formItems instanceof Array) {
        formItems.forEach(i => {
          formModel[i.key] = i?.default
        })
      }
      return formModel
    }

    const tableConfig = {
      rowSelection: {selectedRowKeys: selectedKeys, onChange: onSelectChange, type: 'radio'},
      size: 'small'
    }

    const submitForm = () => {
      formRef.value.validate().then(() => {
        refresh.value += 1
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

    let formModel = reactive(parseFormModel(props.searchDef.formItems))
    return {
      selectedKeys,
      selectedRows,
      tableConfig,
      formRef,
      formModel,
      searchModel,
      parseFormModel,
      submitForm,
      resetForm,
      refresh
    }
  },
  methods: {
    onCancel() {
      this.$emit('update', false)
    },
    onOk() {
      const row = this.selectedRows[0]
      this.$emit('selected', {value: row.id, text: row[this.tableDef.text ?? 'id']})
      this.$emit('update', false)
    }
  }
}
</script>

<style lang="less" scoped>
.ant-form-item {
  margin-bottom: 0px;
}

.cus-embed-table-header {
  margin-bottom: 8px;
}
</style>
