<template>
  <cus-form-container title="登陆表单" description="本表单仅限于开发时使用，生产环境请勿使用">
    <div class="form-block">
      <cus-form :form-def="formDef" @submit="onSubmit"></cus-form>
    </div>
  </cus-form-container>
</template>

<script>
import CusFormContainer from "@/components/form/CusFormContainer";
import CusForm from "@/components/form/CusForm";
import {formDef} from "@/definition/user/userDef";
import {getMenuFromBasePlatform} from "@/funcLib/menuParse";

export default {
  name: "LoginForm",
  components: {
    CusFormContainer, CusForm
  },
  setup () {
    const onSubmit = () => {
      getMenuFromBasePlatform()
    }
    return {
      onSubmit
    }
  },
  data() {
    return {
      formDef
    }
  }
}
</script>

<style scoped>

</style>
