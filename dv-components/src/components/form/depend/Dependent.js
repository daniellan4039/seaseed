export default class Dependent {

  /**
   * include, cascade
   * @type {string}
   */
  type = 'include'

  /**
   * keys array
   * @type {Array}
   */
  dependentKeys = []

  /**
   * two-dimension array
   * @type {Array}
   */
  dependentValues = []

  /**
   *
   * @type {[]}
   */
  dynamicValues = []

  /**
   *
   * @type {number}
   */
  dependentCount = 0

  /**
   * set type include by default
   *
   * @param type
   */
  constructor (type = 'include') {
    this.type = type
  }

  /**
   *
   * @param key
   * @param values
   */
  setDependentKey (key, values) {
    if (key !== null && key !== undefined && values instanceof Array && values.length > 0) {
      this.dependentKeys.push(key)
      this.dependentValues.push(values)
      this.dependentCount = this.dependentKeys.length
    }
  }

  /**
   *
   * @return dependent result
   * @param target
   */
  include (target) {
    const indexOfTarget = this.dependentKeys.findIndex(i => i === target.key)
    if (indexOfTarget !== -1) {
      this.dynamicValues[indexOfTarget] = this.dependentValues[indexOfTarget].includes(target.value) ? 1 : 0
    }
    const dynCount = eval(this.dynamicValues.join('+'))
    return dynCount === this.dependentCount
  }

  /**
   *
   * @param target dependent target
   * @param self this input item
   */
  cascade(target, self) {
    self.reload?.(target)
  }
}
