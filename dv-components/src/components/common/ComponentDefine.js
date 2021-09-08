
class DvInput{
  /**
   * base input definition
   * @param key input component key
   * @param name input component name
   * @param config official component configuration
   */
  constructor (key, name, config) {
    this.key = key
    this.name = name
    this.config = config
  }
}

export class DvInputStringDef extends DvInput {
  constructor (key, name, config) {
    super(key, name, config)
  }
}

export class DvSelectDef extends DvInput{
  constructor (key, name, config) {
    super(key, name, config)
  }
}

