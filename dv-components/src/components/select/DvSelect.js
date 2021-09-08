import { defineComponent, toRef } from 'vue'
import { DvSelectDef } from '../common/ComponentDefine'

export default defineComponent({
  name: 'DvSelect',
  props: {
    def: {
      type: DvSelectDef
    }
  },
  emits: ['update:def'],
  setup(props) {
    const defRef = toRef(props, 'def')

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
