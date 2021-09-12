import DvSelectDef from '@/components/form/DvSelectDef'
import DvInputDef from '@/components/form/DvInputDef'
import DvFormDef from '@/components/form/DvFormDef'

const departmentOptions = [
  {
    label: 'Depart A',
    value: 1
  },
  {
    label: 'Depart B',
    value: 2
  }
]

const sexOptions = [
  {
    label: 'Male',
    value: 1
  },
  {
    label: 'Femal',
    value: 2
  }
]

const userName = new DvInputDef('userName', 'Username')
const nickName = new DvInputDef('nickName', 'Nick Name')
const department = new DvSelectDef('departmentId', 'Department', departmentOptions)
const sex = new DvSelectDef('sex', 'Sex', sexOptions)

sex.setDependent('userName', ['lan', 'jian', 'cheng', 'ting'], 'include')
sex.setDependent('nickName', ['daniel'])
const form = new DvFormDef([userName, nickName, department, sex])
export default form
