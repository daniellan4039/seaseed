<template>
  <a-modal :visible="visible" width="1000px" @cancel="onCancel" @ok="onOk">
    <div class="cus-embed-table-header">
      <a-form>
        <a-row :gutter="16">
          <a-col v-for="(formItem, formItemIndex) in searchDef.formItems" :key="formItemIndex" :span="6"
                 class='search-actions-block'>
            <a-form-item :label="formItem.label" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <a-input :placeholder="formItem.placeholder"/>
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
      <a-table :columns="columnsParsed"
               :data-source="dataSourceParsed"
               :loading="loading"
               :pagination="pagination"
               :row-selection="{ selectedRowKeys: selectedKeys, onChange: onSelectChange, type: 'radio'}"
               bordered size="small"></a-table>
    </div>
  </a-modal>
</template>

<script>

import CusFormInput from "@/components/form/CusFormInput";
import {computed, reactive, ref, watch} from "vue";
import _ from "lodash";

const indexCol = {
  key: 'index',
  title: '序号',
  dataIndex: 'index',
  width: 60
}

export default {
  name: "CusEmbedTable",
  props: ['searchDef', 'tableDef', 'visible'],
  emits: ['update', 'selected'],
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CusFormInput
  },
  setup(props) {
    let columnKeys = reactive([])
    let dataSource = ref({records: [], total: 0})
    let rowIndex = ref(0)
    let loading = ref(true)
    let selectedKeys = ref([])
    let selectedRows = ref([])
    let pageParams = reactive({
      current: 1,
      extra: {},
      model: {},
      order: 'descending',
      size: 10,
      sort: 'id'
    })

    const columnsParsed = computed(() => {
      const tempCols = [indexCol, ...props.tableDef?.columns]
      console.log(tempCols)
      if (columnKeys.length === 0) {
        return tempCols
      } else {
        return _.pick(tempCols, columnKeys)
      }
    })

    const tableWidth = computed(() => {
      let width = 0
      columnsParsed.value.forEach(i => {
        width += i.width ?? 0
      })
      return width
    })

    const dataSourceParsed = computed(() => {
      return dataSource.value.records.map((i) => {
        const echoMap = i?.echoMap
        let alterRecord = {}
        _.assign(alterRecord, i)
        if (echoMap) {
          for (const echoMapKey in echoMap) {
            alterRecord[echoMapKey] = echoMap[echoMapKey]
          }
        }
        alterRecord.key = i.id
        alterRecord['index'] = ++rowIndex.value
        alterRecord.raw = i
        return alterRecord
      })
    })

    const searchPage = () => {
      loading.value = true
      props.tableDef.actions.page(pageParams).then(res => {
        const {isSuccess, data} = res
        isSuccess && (dataSource.value = data)
        loading.value = false
      })
    }

    const pagination = computed(() => {
      return {
        current: pageParams.current,
        pageSize: pageParams.size,
        total: dataSource.value.total ?? 0,
        onChange: onPageChange
      }
    })

    const onSelectChange = (keys, rows) => {
      selectedKeys.value = keys
      selectedRows.value = rows
    }

    watch(pageParams, () => {
      searchPage()
    })

    const onPageChange = (page, pageSize) => {
      pageParams.current = page
      pageParams.size = pageSize
    }

    return {
      columnKeys,
      columnsParsed,
      tableWidth,
      dataSourceParsed,
      dataSource,
      pageParams,
      loading,
      pagination,
      selectedKeys,
      selectedRows,
      searchPage,
      onPageChange,
      onSelectChange
    }
  },
  methods: {
    onCancel() {
      this.$emit('update', false)
    },
    onOk(){
      const row = this.selectedRows[0]
      this.$emit('selected', { value: row.id, text: row[this.tableDef.text ?? 'id']} )
      this.$emit('update', false)
    }
  },
  mounted() {
    this.searchPage()
  },
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
