<template>
  <div style='width: 100px'>
    <div>
      <a-button @click='() => this.selectDef.toggleVisible()'>显示/隐藏</a-button>
    </div>
    <dv-select :def='selectDef'></dv-select>
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
        { placeholder: '请选择设置' },
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
    // selectDef.toggleVisible()
    return {
      selectDef
    }
  }
}
</script>

<style scoped>

</style>