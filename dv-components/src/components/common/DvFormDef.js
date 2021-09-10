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
   * Global unique key
   */
  key = ''

  /**
   * store form items.
   */
  formMap = {}

  /**
   * valid form items
   */
  formItems = []

  /**
   * store all valid properties' key
   * @type {[]}
   */
  formKeys = []

  /**
   * should submitting form keys
   * @type {[]}
   */
  submitFormKeys = []

  /**
   * form model for reactive with back service
   * @type {{}}
   */
  formModel = {}

  /**
   * mark changed properties
   */
  formChangeMarker = {}

  /**
   * submit api
   */
  submitApi

  /**
   * validators for form items
   */
  rules = {}

  /**
   * mark properties that has dependence
   * @type {[]}
   */
  dependenceMarker = {}

  constructor(key, formItems, submitApi, formModel) {
    this.key = key
    this.formItems = formItems
    this.submitApi = submitApi
    formItems.forEach((i) => {
      this.formMap[i.key] = i
      this.formModel[i.key] = formModel?.[i.key]
      this.formChangeMarker[i.key] = null
      this.formKeys.push(i.key)
      this.rules[i.key] = i.rules
      if (i.submit) {
        this.submitFormKeys.push(i.key)
      }
      const { dependency } = i
      if (dependency) {
        const dpKey = dependency.key
        dependency.key = i.key // change the key to origin key for tracing properties which depend on this property
        let entry = this.dependenceMarker[dpKey]
        if (!entry) {
          this.dependenceMarker[dpKey] = [dependency]
        } else {
          entry.push(dependency)
        }
      }
    })
    this.dependenceChange()
  }

  setRules(outerRules) {
    for (const rk in outerRules) {
      this.rules[rk] = [...this.rules[rk], ...outerRules[rk]]
    }
  }

  setFormModel(outerModel) {
    this.formKeys.forEach((p) => {
      const op = outerModel[p]
      if (op !== null && op !== undefined) {
        this.formModel[p] = outerModel[p]
        this.formChangeMarker[p] = null
      }
    })
    this.dependenceChange()
  }

  setSubmitApi(api) {
    this.submitApi = api
  }

  dependenceChange() {
    const self = this
    this.formItems.forEach((it, itk) => {
      const fmi = self.formModel[it.key]
      const fmic = self.formChangeMarker[it.key]
      if (fmi !== fmic) { //check whether changed
        self.formChangeMarker[it.key] = fmi // consume this change
        const dpKey = self.formKeys[itk]
        const dpValue = self.formModel[dpKey]
        const dpItem = self.formMap[dpKey]
        const dependencies = self.dependenceMarker[dpKey]
        dependencies?.forEach((dp) => {
          const tgItem = self.formMap[dp.key]
          switch (dp.condition) {
            case 'include':
              tgItem.visible = dp.values?.includes(dpValue)
              break
            case 'exclude':
              tgItem.visible = !dp.values?.includes(dpValue)
              break
            case 'cascade':
              tgItem.load?.({
                key: dpKey,
                value: dpValue,
                item: dpItem,
                self: tgItem
              })
              break
          }
        })
      }
    })
  }

  submit(formRef) {
    formRef?.value.validate().then(() => {
      return this.submitApi?.(this.formModel)
    })
  }
}
