import { defineComponent, toRef, watch } from 'vue'
import { DvSelectDef } from '../common/ComponentDefine'

export default defineComponent({
  name: 'DvSelect',
  props: {
    def: {
      type: DvSelectDef
    }
  },
  emits: ['update:def'],
  setup(props, ctx) {
    const defRef = toRef(props, 'def')
    watch(defRef, nv => {
      ctx.emits('update:def', nv)
    })
    return{
      defRef
    }
  },
  render() {
    return <a-select style='width: 300px;'>
      <a-select-option value='1'>Default Selection 1</a-select-option>
    </a-select>
  }
})
