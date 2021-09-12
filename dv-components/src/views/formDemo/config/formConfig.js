import DvInputStringDef from '@/components/common/DvInputStringDef'
import { DvSelectDef } from '@/components/common/DvSelectDef'
import { DvFormDef } from '@/components/common/DvFormDef'

// eslint-disable-next-line no-unused-vars
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
// eslint-disable-next-line no-unused-vars
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
const sex = new DvSelectDef('sex', 'Sex', null, )
const department = new DvSelectDef('departmentId', 'Department')
const nickName = new DvInputStringDef('nickName', 'Nick Name')

const firstForm = new DvFormDef('firstForm', [
  userName, department, sex, nickName
])

/****************************************************************/



export default firstForm
