export class DvInput {

  /**
   * base input definition
   * all ant design api or events are set in config
   *
   * @param key input component key
   * @param name
   * @param value item value
   * @param config official component configuration
   * @param rules rules for this item
   */
  constructor(key, name, config, rules) {
    this.key = key
    this.name = name
    this.config = config
    this.rules = rules
    this.dependency = null
    this.visible = true
    this.load = undefined
    this.submit = true
    this.scope = ['form', 'detail']
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
}
