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
   * it returns a promise object
   */
  cascadeService = () => {
    console.log('cascade method not define')
  }

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
   * @param values it is array for 'include' type, or a method for 'cascade' type
   */
  setDependentKey (key, values) {
    if(this.type === 'include') {
      if (key !== null && key !== undefined && values instanceof Array && values.length > 0) {
        this.dependentKeys.push(key)
        this.dependentValues.push(values)
        this.dependentCount = this.dependentKeys.length
      }
    } else {
      // for cascade
      this.dependentKeys.push(key)
      this.cascadeService = values
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
      this.dynamicValues[indexOfTarget] = this.dependentValues[indexOfTarget]?.includes(target.value) ? 1 : 0
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
    if(this.cascadeService && this.cascadeService instanceof Function) {
      this.cascadeService({ self: self, target: target }).then(res => {
        self.reload(res)
      })
    }
  }
}
