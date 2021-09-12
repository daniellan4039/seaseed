export default class DvFormDef {

  formModel = {}

  formItems = []

  formMap = {}

  constructor (formItems = []) {
    this.formItems = formItems
    for (let i = 0; i < formItems.length; i++) {
      const key = formItems[i].key
      const formItem = formItems[i]
      this.formMap[key] = formItems[i]
      this.formModel[key] = null
      const thisDependent = formItem.dependent
      if(thisDependent) {
        const dpKeys = thisDependent.dependentKeys
        dpKeys.forEach(k => {
          this.formMap[k].subscribe(formItem)
        })
      }
    }
  }

  setModel(model) {
    for (let i = 0; i < this.formItems.length; i++) {
      const key = this.formItems[i].key
      this.formItems[i].value = model[key]
    }
  }

  refreshDependency(){
    for (let i = 0; i < this.formItems.length; i++) {
      const formItem = this.formItems[i]
      const key = formItem.key
      const value =  this.formModel[key]
      if(formItem.value !== value) {
        formItem.setValue(value)
      }
      if (formItem.changed) {
        formItem.notify()
        formItem.changed = false
      }
    }
    console.log(this)
  }

}
