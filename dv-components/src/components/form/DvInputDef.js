import Dependent from '@/components/form/depend/Dependent'

export default class DvInputDef {

  counter = 0

  /**
   *
   * @type {string}
   */
  key=''

  /**
   *
   * @type {string}
   */
  label=''

  /**
   *
   * @type {Object}
   */
  value=null

  /**
   *
   * @type {Array}
   */
  subscribers = []

  /**
   * include, cascade
   * @type {Dependent}
   */
  dependent = new Dependent()

  /**
   *
   * @type {boolean}
   */
  visible = true

  constructor (key, label) {
    this.key = key
    this.label = label
  }

  setValue(val){
    this.value = val
  }

  subscribe(item) {
    this.subscribers.push(item)
  }
  unSubscribe(key){
    if(key) {
      const index = this.subscribers.find(i => i.key === key)
      if(index !== -1) {
        this.subscribers.splice(index, 1)
      }
    }
  }

  setDependent(key, values, type='include') {
    this.dependent.type = type
    this.dependent.setDependentKey(key, values)
  }

  /**
   * called by dependent input item
   */
  responseChange(target) {
    if(this.dependent.type === 'include') {
      this.visible = this.dependent.include(target)
    } else {
      this.dependent.cascade(target, this)
    }
    this.counter++
  }

  notify(dpValue){
    if(dpValue !== this.value || this.counter === 0) {
      this.setValue(dpValue)
      const self = this
      this.subscribers.forEach(s => {
        s.responseChange(self)
      })
    }
  }

  /**
   * reload function
   */
  reload() {
    console.log('this component not defines reload method')
  }
}
