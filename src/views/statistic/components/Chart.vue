<template>
  <div :id="id" :style="style">
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {onMounted, ref, watch} from "vue";

export default {
  name: "Chart",
  props: {
    id: {
      type: String,
      required: true,
      default: 'pie'
    },
    style: {
      type: Object,
      default: () => ({
        height: '100%',
        width: '100%'
      })
    },
    option: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const myChart = ref()
    onMounted(() => {
      const chartDom = document.getElementById(props.id);
      myChart.value = echarts.init(chartDom)
      props.option && myChart.value.setOption(props.option)
    })
    watch(props.option, (nv) => {
      console.log(nv)
      nv && myChart.value.setOption(props.option)
    }, {deep:true})
    return {
      myChart
    }
  }
}
</script>

<style scoped>

</style>
