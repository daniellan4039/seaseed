<template>
  <cus-table-container :def="tableDef.searchParams" @submit="onSubmit">
    <div class="table-block" id='HRMS_TABLE_CONTAINER'>
      <cus-table :table-def="tableDef" :search-model="searchModel" :refresh="refresh">
        <template #actionExt="{record}">
          <a-menu-item>
            <a @click="onBorrow(record)">借阅</a>
          </a-menu-item>
          <a-menu-item>
            <a @click="onReturn(record)">归还</a>
          </a-menu-item>
        </template>
      </cus-table>
    </div>
  </cus-table-container>
</template>

<script>
import {tableDef} from "@/definition/archive/archiveDef"
import {CusTable, CusTableContainer} from '@/components'
import {ref} from "vue";
import router from "@/router";
import store from '@/store'

export default {
  name: "Archive",
  components: {
    CusTable, CusTableContainer
  },
  setup() {
    let refresh = ref(0)
    const searchModel = ref({})
    const onSubmit = (model) => {
      searchModel.value = model
      refresh.value++
    }
    const onBorrow = (record) => {
      store.dispatch('setArchive', record)
      router.push({path: '/archiveBorrow/form'})
    }
    const onReturn = (record) => {
      console.log(record)
    }
    return {
      tableDef,
      refresh,
      searchModel,
      onSubmit,
      onBorrow,
      onReturn
    }
  }
}
</script>

<style scoped lang="less">

</style>
