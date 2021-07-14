<template>
  <cus-form-container title="职工导入">
    <template #title>
      <div>
        <h3>上传Excel文档注意以下要点：</h3>
        <h5>1、请按照数据模版的格式准备要导入的数据；</h5>
        <h5>2、重复数据会覆盖上一条数据；</h5>
        <h5>3、一次只能上传一个Excel文件，一个文件不要超过100条数据。</h5>
        <div class="import-result">
          <a-typography-title style="color: #e0614a" v-if="nullWarning.length > 0" :level=5 content='警告'/>
          <a-typography-paragraph style="color: #e0614a" v-for="(v,k) in nullWarning" :key="k" :content='v.message' />
        </div>
      </div>
    </template>
    <div class="form-block">
      <div class="ops-bar">
        <span>
          <a-button style="margin-right: 8px;" type="default">下载模版</a-button>
          <cus-upload :custom-request="uploadFile" :enable-upload="false" :show-upload-list="false" text="导入Excel"/>
        </span>
        <span>
          <a-button type="primary" style="margin-left: 8px;">上传</a-button>
          <a-button type="default" style="margin-left: 8px;">导出Excel</a-button>
        </span>
      </div>
      <div class="table-container">
        <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500 }" size="small">
          <template v-for="col in columns" :key="col.key" #[col.key]="{record}">
            <a-input v-model:value="record[col.key]" :style="{ background: warningColor(col.key, record[col.key])}"/>
          </template>
        </a-table>
      </div>
    </div>
  </cus-form-container>
</template>

<script>
import {CusFormContainer, CusUpload} from "@/components";
import {computed, ref} from "vue";
import {readExcel} from "@/funcLib/cusExcelJs";

export default {
  name: "EmployeeBatchImport",
  components: {
    CusUpload, CusFormContainer
  },
  setup() {
    const columns = ref([])
    const data = ref([])
    const requiredConstraints = ref({})

    const uploadFile = ({file}) => {
      let fr = new FileReader()
      fr.readAsArrayBuffer(file)
      fr.onload = () => {
        const result = readExcel(fr.result)
        columns.value = result.columns
        data.value = result.data
        requiredConstraints.value = result.colRequired
      }
    }

    const warningColor = (key, value) => {
      return (requiredConstraints.value[key] && (value === null || value === undefined || value === '')) ? '#ffc56e' : null
    }

    const nullWarning = computed(() => {
      const message = []
      data.value.forEach(d => {
        for (let dKey in d) {
          if (requiredConstraints.value[dKey] && (d[dKey] === null || d[dKey] === undefined || d[dKey] === '')) {
            message.push({
              message: `第${d['key']}条数据存在一个或多个必填的信息为空，请手动补充`
            })
            break
          }
        }
      })
      return message
    })

    return {
      uploadFile,
      warningColor,
      nullWarning,
      columns,
      data,
      requiredConstraints
    }
  },
  data: () => ({
  })
}
</script>

<style lang="less" scoped>
.ops-bar{
  display: flex;
  justify-content: space-between;
}

.import-result {
  margin: 20px 0;
  color: yellow;
}
.table-container{
  margin-top: 8px;
}
</style>
