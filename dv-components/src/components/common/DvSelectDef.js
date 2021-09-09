import { DvInput } from './DvInput'

/**
 * Select definition.
 * key: unique key
 * config: official component configs
 * options: selection options
 */
export class DvSelectDef extends DvInput {
  constructor(key, name, config = {}, rules, options=[]) {
    super(key, name, config, rules)
    this.visible = true
    this.options = options
    this.setLoad((options) => {
      this.options = options
    })
  }

  set setOptions(options) {
    this.options = options
  }
  get getOptions() {
    return this.options
  }
}
