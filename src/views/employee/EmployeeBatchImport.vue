<template>
  <cus-form-container :description="des" title="职工导入">
    <div class="form-block">
      <div>
        <a-button style="margin-right: 8px;" type="primary">下载模版</a-button>
        <cus-upload :custom-request="uploadFile" :enable-upload="false" :show-upload-list="false" text="预览数据" />
      </div>
      <div class="table-container">
        <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500 }">
          <template v-for="col in columns" :key="col.key" #[col.key]="{record}">
            <a-input v-model:value="record[col.key]" :style="{ background: warningColor(col.key, record[col.key])}"/>
          </template>
        </a-table>
      </div>
      <div class="import-result">
        <div v-for="(v,k) in warnings" :key="k">
          {{ v.message }}
        </div>
      </div>
    </div>
  </cus-form-container>
</template>

<script>
import {CusFormContainer, CusUpload} from "@/components";
// eslint-disable-next-line no-unused-vars
import {ref} from "vue";
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
    const warnings = ref([])

    const uploadFile = ({file}) => {
      let fr = new FileReader()
      fr.readAsArrayBuffer(file)
      fr.onload = () => {
        const result = readExcel(fr.result)
        columns.value = result.columns
        data.value = result.data
        requiredConstraints.value = result.colRequired
        warnings.value = nullWarning(result.data, result.colRequired)
        console.log(warnings)
      }
    }

    const warningColor = (key, value) => {
      return (requiredConstraints.value[key] && (value === null || value === undefined)) ? '#ff6e86' : null
    }

    const nullWarning = (data = [], restraints = {}) => {
      const message = []
      data.forEach(d => {
        for (let dKey in d) {
          if (restraints[dKey] && (d[dKey] === null || d[dKey] === undefined)) {
            message.push({
              message: `第${d['key']}条数据存在一个或多个必填的信息为空，请手动补充`
            })
            break
          }
        }
      })
      return message
    }

    return {
      uploadFile,
      warningColor,
      nullWarning,
      columns,
      data,
      requiredConstraints,
      warnings
    }
  },
  data: () => ({
    des: '请上传Excel文档，并注意以下要点：一、请按照数据模版的格式准备要导入的数据；二、重复数据会覆盖上一条数据；三、一次只能上传一个Excel文件，一个文件不要超过100条数据。',
  })
}
</script>

<style scoped lang="less">
.test{
  background: #ff6e86;
}
.import-result{
  margin: 20px 0;
}
</style>
