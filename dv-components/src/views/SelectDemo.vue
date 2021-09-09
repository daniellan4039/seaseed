<template>
  <div style='width: 100px'>
    <dv-select :def='selectDef' style='min-width: 200px;' v-model:value='selectValue'></dv-select>
  </div>
</template>

<script>
import { DvSelectDef } from '../components/common/DvSelectDef'
import { ref } from 'vue'

export default {
  name: 'Select',
  setup() {
    const selectDef = ref(
      new DvSelectDef(
        'baseSelect',
        { placeholder: '请选择设置', mode: 'multiple' },
        [
          {
            value: '1',
            label: '默认'
          },
          {
            value: '2',
            label: '大号'
          }
        ]
      )
    )
    const selectValue = ref()

    return {
      selectDef,
      selectValue
    }
  }
}
</script>

<style scoped>

</style>