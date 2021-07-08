<template>
  <a-select v-model:value="modelValue" :placeholder="def.placeholder" style="width: 100%;"
            :filter-option="false" :not-found-content="fetching ? undefined : null" show-search
            @search="search">
    <template v-if="fetching" #notFoundContent>
      <a-spin size="small" />
    </template>
    <template #suffixIcon>
      <SearchOutlined @click="onMore"/>
      <CusEmbedTable v-model:visible="tableVisible" :searchDef="def.meta.searchDef" :tableDef="def.meta.tableDef" @selected="onMoreSelect"></CusEmbedTable>
    </template>
    <a-select-option v-for="o in options" :key="o.value" :value="o.value">
      {{ o.text }}
    </a-select-option>
  </a-select>
</template>

<script>
import {ref, watch} from "vue";
import {SearchOutlined} from "@ant-design/icons-vue";
import CusEmbedTable from "@/components/form/CusEmbedTable";

export default {
  name: "CusSelectSearch",
  props: ['value', 'def', 'text'],
  emits: ['change'],
  components: {SearchOutlined, CusEmbedTable},
  setup(props, ctx) {
    const modelValue = ref(props.value)
    const fetching = ref(false)
    const {action, keyword} = props.def.meta.search ?? {action: undefined, keyword: undefined}
    const options = ref([])
    const tableVisible = ref(false)

    if(props.text && props.value) {
      if(props.def.key === 'employeeId'){
        options.value.push({
          value: props.value,
          text: props.text?.realName
        })
      } else {
        options.value.push({
          value: props.value,
          text: props.text
        })
      }
    }

    const search = (arg) => {
      const parameter = {}
      parameter[keyword] = arg
      fetching.value = true
      action(parameter).then(res => {
        const {isSuccess, data} = res
        if (isSuccess) {
          options.value = []
          options.value = data.map(i => {
            return {
              value: i.id,
              text: i[keyword]
            }
          })
        }
        fetching.value = false
      })
    }

    const onMore = () => {
      tableVisible.value = !tableVisible.value
    }

    const onMoreSelect = (val) => {
      options.value.push(val)
      modelValue.value = val.value
      ctx.emit('change', val.value)
    }

    watch(modelValue, val => {
      ctx.emit('change', val)
    })

    return{
      modelValue,
      fetching,
      options,
      tableVisible,
      search,
      onMore,
      onMoreSelect
    }
  },

}
</script>

<style scoped>

</style>
