<template>
  <cus-table-container :def="tableDef.searchParams" @submit="onSubmit" :show-search-block="false">
    <div id='HRMS_TABLE_CONTAINER' class="table-block">
      <div style="margin-right: 8px;">
        <a-input-search v-model:value="keywords" placeholder="请输入关键字" style="margin-bottom: 8px"/>
        <div :style="{ maxHeight: maxHeight + 'px'}" class="type-block">
          <a-tree v-model:selectedKeys="treeSelectedKeys" :tree-data="dictData" @select="onTreeSelected"></a-tree>
        </div>
      </div>
      <cus-table :refresh="refresh" :search-model="searchModel" :table-def="tableDef" class="table">
      </cus-table>
    </div>
  </cus-table-container>
</template>

<script>
import {tableDef} from "@/definition/dictionary/dictionaryDef"
import {CusTable, CusTableContainer} from '@/components'
import {onMounted, ref, watch} from "vue";
import {dictData} from "@/views/dictionary/basicData";
import {retrieveSubItemsByKey} from "@/funcLib/arrayFunc";

export default {
  name: "Dictionary",
  components: {
    CusTable, CusTableContainer
  },
  setup() {
    let refresh = ref(0)
    let maxHeight = ref(200)
    const searchModel = ref({})
    const keywords = ref('')
    const treeSelectedKeys = ref([])

    const onSubmit = (model) => {
      searchModel.value = model
      refresh.value++
    }

    onMounted(() => {
      maxHeight.value = document.body.offsetHeight - 64 - 56 - 38  - 40 - 32 - 32 - 32
    })

    watch(keywords, val => {
      const results = retrieveSubItemsByKey(dictData, 'title', val)
      treeSelectedKeys.value.length = 0
      results?.forEach(r => {
        treeSelectedKeys.value.push(r?.key)
      })
    })

    const onTreeSelected = (selectedKeys) => {
      searchModel.value = {
        dictCode: selectedKeys[0],
        dictCodeEqual: true,
        ignoreParent: true
      }
      refresh.value++
      console.log(searchModel.value)
    }

    return {
      refresh,
      searchModel,
      maxHeight,
      keywords,
      treeSelectedKeys,
      onSubmit,
      onTreeSelected,
      dictData,
      tableDef,
    }
  }
}
</script>

<style lang="less" scoped>
.table-block {
  display: flex;

  .type-block {
    overflow: auto;
    margin-right: 8px;
  }

  .table {
    flex-grow: 2;
  }
}
</style>
