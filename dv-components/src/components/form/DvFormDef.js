export default class DvFormDef {

  formModel = {}

  formItems = []

  formMap = {}

  rules = {}

  constructor (formItems = [], rules) {
    this.formItems = formItems
    for (let i = 0; i < formItems.length; i++) {
      const key = formItems[i].key
      const formItem = formItems[i]
      this.formMap[key] = formItems[i]
      this.formModel[key] = null
      const thisDependent = formItem.dependent
      if (thisDependent) {
        const dpKeys = thisDependent.dependentKeys
        dpKeys.forEach(k => {
          this.formMap[k].subscribe(formItem)
        })
      }
    }
    this.rules = rules??{}
    this.refreshDependency()
  }

  setModel (model) {
    for (let i = 0; i < this.formItems.length; i++) {
      const key = this.formItems[i].key
      this.formItems[i].value = model[key]
      this.formModel[key] = model[key]
    }
    this.refreshDependency()
  }

  refreshDependency () {
    for (let i = 0; i < this.formItems.length; i++) {
      const formItem = this.formItems[i]
      const key = formItem.key
      const value = this.formModel[key]
      formItem.notify(value)
    }
  }

  submit (formRef) {
    if (formRef) {
      formRef.value.validate().then(() => {
        console.log(this.formModel)
      })
    }
  }

  resetForm(formRef) {
    formRef.value.resetFields();
  }

  setRules(rules) {
    for (const key in rules) {
      if (!this.rules[key]) {
        this.rules[key] = []
      }
      this.rules[key].push(...rules[key])
    }
  }

  setAsynRules(asynService) {
    asynService?.().then?.((rules)=>{
      setTimeout
      this.setRules(rules)
    })
  }

}
