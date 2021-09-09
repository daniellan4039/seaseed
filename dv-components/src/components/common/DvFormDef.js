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

  #submitApi = null

  /**
   *
   * DvFormDef defines key, formMap, formItems, formModel, rules
   *
   * @param formRef
   * @param key
   * @param formItems
   */
  constructor(formRef, key, formItems) {
    this.formRef = formRef
    this.key = key
    this.formMap = {}
    if (formItems instanceof Array) {
      this.formItems = formItems
      formItems.forEach((item) => {
        this.formMap[item.key] = item
      })
    }
    this.rules = {}
    this.formModel = {}
    formItems.forEach(i => {
      this.rules[i.key] = i.rules
      if(i.submit) {
        this.formModel[i.key] = null
      }
    })
  }

  set submitApi(api) {
    this.#submitApi = api
  }

  dependenceChange() {
    this.formItems.forEach(i => {
      if (i.dependency && i.dependency.key) {
        const { key, condition, values } = i.dependency
        if (condition instanceof String) {
          if (condition in ['include', 'exclude']) {
            let visible = true
            if (condition === 'include') visible = true
            if (condition === 'exclude') visible = false
            if (values instanceof Array && values.length > 0) {
              i.visible = values.includes(this.formMap[key]) && visible
            } else {
              const dependentItem = this.formMap[key]
              if (dependentItem === null || dependentItem === undefined) {
                i.visible = visible
              }
            }
          } else {
            // condition === 'cascade'
            if (i.changed) {
              const cascadeItems = this.formItems?.filter?.(i => i.dependency?.condition === 'cascade' && i.dependency?.key === i.key)
              cascadeItems.formItems(c => {
                c.load?.()
              })
            }
          }
        }
      }
    })
  }

  submit() {
    this.formRef?.value?.validate?.().then(() => {
      console.log('submitting form model: ', this.formModel)
      return this.#submitApi(this.formModel)
    })
  }
}