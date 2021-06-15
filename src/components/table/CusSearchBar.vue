<template>
  <div class="search-block">
    <a-form>
      <a-row :gutter="16" :offset='20'>
        <a-col :span="4" v-for="(formItem, formItemIndex) in formDef?.formItems" :key="formItemIndex" class='search-actions-block'>
          <a-form-item :label="formItem.label" :label-col="{ span: 7 }" :wrapper-col="{span: 17}">
            <cus-form-input :item="formItem"></cus-form-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col offset='20' span='4' class='search-actions-block'>
          <a-space align='end'>
            <a-button type='primary'>搜索</a-button>
            <a-button>重置</a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import CusFormInput from "@/components/form/CusFormInput";

export default {
  name: "CusSearchBar",
  props: {
    formDef: {
      type: Object,
      required: true
    }
  },
  components: {
    CusFormInput
  }
}
</script>

<style scoped>

</style>
