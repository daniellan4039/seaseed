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

const departReloadApi = (name) => {
  if(name) {
    const { value } = name.target
    const count = 3
    const options = []
    for (let i = 1; i <= count; i++) {
      options.push({
        label: 'Depart ' + value + ' ' + i,
        value: i
      })
    }
    return Promise.resolve(options)
  } else {
    return Promise.reject({
      isSuccess: false,
      message: 'name cannot be false or absance'
    })
  }
}

const userName = new DvInputDef('userName', 'Username')
const nickName = new DvInputDef('nickName', 'Nick Name')
const department = new DvSelectDef('departmentId', 'Department', departmentOptions)
const sex = new DvSelectDef('sex', 'Sex', sexOptions)

sex.setDependent('userName', ['lan', 'jian', 'cheng', 'ting'], 'include')
sex.setDependent('nickName', ['daniel'])

department.setDependent('userName', departReloadApi, 'cascade')
const form = new DvFormDef([userName, nickName, department, sex])
export default form
