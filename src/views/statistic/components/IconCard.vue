<template>
  <cus-menu-icon :background-style="{borderRadius: '20px', width: '115px'}" :icon-background-style="{background:
  iconBackground,
  padding: '8px'}"
                 :show-hover-border="false"
                 :title-background-style="{background: '#f9f9f9', padding: '8px 0'}"
                 :icon-type="iconType">
    <template #title>
      <div><span style="font-size: 24px">{{count}}</span>人</div>
      <div>{{title}}</div>
    </template>
  </cus-menu-icon>
</template>

<script>
import CusMenuIcon from "@/components/menu/CusMenuIcon";

export default {
  name: "IconCard",
  props: ['iconType', 'iconBackground', 'count', 'title'],
  components: {CusMenuIcon}
}
</script>

<style scoped>

</style>
