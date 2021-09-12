import Dependent from '@/components/form/depend/Dependent'

export default class DvInputDef {

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
   * change marker
   * @type {boolean}
   */
  changed = false

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

  /**
   * reload function
   */
  reload = () => {}

  constructor (key, label) {
    this.key = key
    this.label = label
  }

  setValue(val){
    this.value = val
    this.changed = true
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
      console.log('this.visible:', this.visible)
    } else {
      this.dependent.cascade(target, this)
    }
  }

  notify(){
    const self = this
    this.subscribers.forEach(s => {
      s.responseChange(self)
    })
  }
}
