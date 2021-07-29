<template>
  <cus-table-container :def="tableDef.searchParams" @submit="onSubmit">
    <div id='HRMS_TABLE_CONTAINER' class="table-block">
      <cus-table :refresh="refresh" :search-model="searchModel" :table-def="tableDef" :extra-actions="extraActions" />
      <a-modal v-model:visible="showReturn" :footer="null" title="归还">
        <cus-form :before-submit="beforeReturn" :form-def="returnFormDef" @submit="onFinishReturn"/>
      </a-modal>
    </div>
  </cus-table-container>
</template>

<script>
import {tableDef} from "@/definition/archive/archiveDef"
import {returnFormDef} from "@/definition/archiveBorrow/archiveBorrowDef";
import {CusForm, CusTable, CusTableContainer} from '@/components'
import {ref} from "vue";
import router from "@/router";
import store from '@/store'
import {Modal} from "ant-design-vue";

export default {
  name: "Archive",
  components: {
    CusTable, CusTableContainer, CusForm
  },
  setup() {
    let refresh = ref(0)
    const searchModel = ref({})
    const showReturn = ref(false)
    const choosedArchive = ref()
    const extraActions = ref()
    const onSubmit = (model) => {
      searchModel.value = model
      refresh.value++
    }
    const onBorrow = ({record}) => {
      if (record.borrowState === '1') {
        Modal.warn({
          title: '提示',
          content: '此档案已借出'
        })
      } else {
        store.dispatch('setArchive', record)
        router.push({path: '/archiveBorrow/form'})
      }
    }
    const onReturn = ({record}) => {
      if (record.borrowState === '0') {
        Modal.warn({
          title: '提示',
          content: '此档案已归还'
        })
      } else {
        choosedArchive.value = record
        record._edit = 1
        store.dispatch('setArchive', record)
        showReturn.value = !showReturn.value
      }
    }
    const beforeReturn = ({record}) => {
      record.archiveId = choosedArchive.value.id
    }
    const onFinishReturn = () => {
      showReturn.value = false
    }

    extraActions.value = [
      {
        name: '借阅',
        onClick: onBorrow
      },
      {
        name: '归还',
        onClick: onReturn
      }
    ]

    return {
      tableDef,
      showReturn,
      refresh,
      searchModel,
      returnFormDef,
      choosedArchive,
      extraActions,
      onSubmit,
      onBorrow,
      onReturn,
      beforeReturn,
      onFinishReturn
    }
  }
}
</script>

<style lang="less" scoped>

</style>
