/**
 * Form definition.
 *
 * dependency controlling,
 * cascading changing,
 * rules setting,
 * fields filtering,
 * fields loading
 * form submitting
 */
export class DvFormDef {

  /**
   *
   * DvFormDef defines key, formMap, formItems, formModel, formChange, rules
   *
   * @param formRef
   * @param key
   * @param formItems
   * @param defaultFormModel
   */
  constructor(key, formItems, defaultFormModel, submitApi) {
    this.key = key
    this.rules = {}
    this.formModel = {}
    this.formChange = {} // for tracing formModel properties
    this.formMap = {}
    this.formItems = []
    this.submitApi =  submitApi

    if (formItems instanceof Array) {
      this.formItems = formItems
      formItems.forEach((item) => {
        this.formMap[item.key] = item
        this.rules[item.key] = item?.rules
        if(item.submit) {
          if (defaultFormModel instanceof Object || item.value !== null && item.value !== undefined) {
            item.value = defaultFormModel[item.key] ?? item.value
          }
          this.formModel[item.key] = item.value
          this.formChange[item.key] = item.value
        }
      })
    }
    this.dependenceChange()
  }

  setRules(rules){
    this.rules = rules
  }

  setSubmitApi(api) {
    this.submitApi = api
  }

  dependenceChange() {
    const self = this
    this.formItems.forEach(i => {
      if (i.dependency && i.dependency.key) {
        const { key, condition, values } = i.dependency
        if (condition) {
          if (['include', 'exclude'].includes(condition)) {
            let visible = true
            if (condition === 'include') {
              visible = true
            }
            if (condition === 'exclude') {
              visible = false
            }
            if (values instanceof Array && values.length > 0) {
              i.visible = values.includes(self.formModel[key]) === visible
            } else {
              const dependentValue = self.formModel[key]
              i.visible = !!dependentValue
            }
          } else {// condition === 'cascade'
            if (self.formModel[key] !== self.formChange[key]) { // check whether properties changed
              self.formChange[key] = self.formModel[key] // consume this changed property info
              self.formMap[i.key]?.load?.({
                key: i.key,
                value: self.formModel[key],
                item: i
              })
              self.formModel[i.key] = null
            }
          }
        }
      }
    })
  }



  submit(formRef) {
    formRef?.value.validate().then(() => {
      console.log('submitting form model: ', this.formModel)
      return this.submitApi?.(this.formModel)
    })
  }
}
