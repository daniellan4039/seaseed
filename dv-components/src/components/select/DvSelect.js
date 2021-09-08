import { defineComponent, h, resolveComponent, toRef, watch } from 'vue'
import { DvSelectDef } from '../common/DvSelectDef'

export default defineComponent({
  name: 'DvSelect',
  props: {
    def: {
      type: DvSelectDef || Object,
      required: true
    }
  },
  emits: ['update:def'],
  setup(props, ctx) {
    const defRef = toRef(props, 'def')
    watch(defRef, nv => {
      ctx.emit('update:def', nv)
    }, { deep: true })
    return {
      defRef
    }
  },
  render: function() {
    const config = this.defRef.config
    if(!this.defRef.visible) {
      return null
    } else {
      return h(resolveComponent('a-select'),
        {
          options: this.defRef?.options,
          ...config
        }
      )
    }
  }
})
