export class DvInput {

  #value = null

  /**
   * base input definition
   * all ant design api or events are set in config
   *
   * @param key input component key
   * @param value item value
   * @param config official component configuration
   * @param rules rules for this item
   */
  constructor(key, value, config, rules) {
    this.key = key
    this.#value = value
    this.config = config
    this.rules = rules
    this.dependency = null
    this.visible = true
    this.load = undefined
    this.changed = false
    this.submit = true
    this.scope = ['form', 'detail']
  }

  get value() {
    return this.#value
  }
  set value(val) {
    this.#value = val
    this.markChange()
  }

  setLoad(load) {
    if(load instanceof Function) {
      this.load = load
    }
  }

  /**
   * toggle visibility of this item
   */
  toggleVisible() {
    this.visible = !this.visible
  }

  /**
   * mark this item is changed
   */
  markChange(){
    this.changed = true
  }

  /**
   * if consumed changed info, then recover its' state
   *
   */
  consumeChange() {
    this.changed = false
  }
}