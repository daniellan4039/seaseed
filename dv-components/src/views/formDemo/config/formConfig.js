import DvInputStringDef from '@/components/common/DvInputStringDef'
import { DvSelectDef } from '@/components/common/DvSelectDef'
import { DvFormDef } from '@/components/common/DvFormDef'

const getDep = function(param) {
  if (param === 'lan') {
    return Promise.resolve({
      isSuccess: true,
      data: [
        {
          dictValue: '1',
          dictTxt: 'Dep A'
        },
        {
          dictValue: '2',
          dictTxt: 'Dep B'
        }
      ]
    })
  } else if (param === 'cheng') {
    return Promise.resolve({
      isSuccess: true,
      data: [
        {
          dictValue: '3',
          dictTxt: 'Dep C'
        },
        {
          dictValue: '4',
          dictTxt: 'Dep D'
        }
      ]
    })
  } else {
    return Promise.resolve({
      isSuccess: true,
      data: [
        {
          dictValue: '0',
          dictTxt: 'Unknown'
        }
      ]
    })
  }
}
const getSex = function() {
  return Promise.resolve({
    isSuccess: true,
    data: [
      {
        label: 'Male',
        value: '1'
      },
      {
        label: 'Female',
        value: '2'
      }
    ]
  })
}

const userName = new DvInputStringDef('userName', 'User Name')
const sex = new DvSelectDef('sex', 'Sex', null, [
  {
    required: true,
    message: 'Please select',
    trigger: 'blur'
  }
], [
  {
    label: 'unknown',
    value: '0'
  },
  {
    label: 'Male',
    value: '1'
  },
  {
    label: 'Female',
    value: '2'
  }
])
sex.setLoad((condition) => {
  getSex().then(res => {
    if (res.isSuccess) {
      condition.self.options = res.data
    }
  })
})
sex.dependency = {
  key: 'departmentId',
  condition: 'include',
  values: ['3']
}
const department = new DvSelectDef('departmentId', 'Department', null, null, [
  {
    label: 'unknown',
    value: '0'
  }
])
department.dependency = {
  key: 'userName',
  condition: 'cascade'
}
department.setLoad((condition) => {
  getDep(condition.value).then(res => {
    if (res.isSuccess) {
      condition.self.options = res.data.map(i => {
        return {
          label: i.dictTxt,
          value: i.dictValue
        }
      })
    }
  })
})

const nickName = new DvInputStringDef('nickName', 'Nick Name')

const firstForm = new DvFormDef('firstForm', [
  userName, department, sex, nickName
])

export default firstForm
