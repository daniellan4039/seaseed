<template>
  <div class="search-block">
    <cus-form :form-def="formDef" :showGroupTitle="false" :max-cols="4" :threshold-cols="1" submit-text="搜索" @submit="submitForm">
    </cus-form>
  </div>
</template>

<script>
import CusForm from "@/components/form/CusForm";

export default {
  name: "CusSearchBar",
  props: {
    formDef: {
      type: Object,
      required: true
    },
  },
  emits: ['submit'],
  components: {
    CusForm
  },
  setup(props, ctx) {
    const submitForm = (formModel) => {
      ctx.emit('submit', formModel)
    }
    return {
      submitForm
    }
  }
}
</script>

<style scoped>

</style>
