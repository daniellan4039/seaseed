<template>
  <a-modal :visible="visible" width="1000px" @cancel="onCancel" @ok="onOk">
    <div class="cus-embed-table-header">
      <a-form>
        <a-row :gutter="16">
          <a-col v-for="(formItem, formItemIndex) in searchDef.formItems" :key="formItemIndex" :span="6"
                 class='search-actions-block'>
            <a-form-item :label="formItem.label" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <cus-base-input :item="formItem"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
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
      <cus-table :config="tableConfig" :ops-bar-visible="false" :table-def="tableDef"/>
    </div>
  </a-modal>
</template>

<script>
import {ref,} from "vue";
import CusTable from "@/components/table/CusTable";
import CusBaseInput from "@/components/form/select/CusBaseInput";

export default {
  name: "CusEmbedTable",
  props: ['searchDef', 'tableDef', 'visible'],
  emits: ['update', 'selected'],
  components: {
    CusTable, CusBaseInput
  },
  setup() {
    let selectedKeys = ref([])
    let selectedRows = ref([])

    const onSelectChange = (keys, rows) => {
      selectedKeys.value = keys
      selectedRows.value = rows
    }

    const tableConfig = {
      rowSelection: {selectedRowKeys: selectedKeys, onChange: onSelectChange, type: 'radio'}
    }
    return {
      selectedKeys,
      selectedRows,
      tableConfig
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
