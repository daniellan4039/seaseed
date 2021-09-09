import { DvInput } from './DvInput'

/**
 * Select definition.
 * key: unique key
 * config: official component configs
 * options: selection options
 */
export class DvSelectDef extends DvInput {
  constructor(key, value, config = {}, rules={}, options=[]) {
    super(key, value, config, rules)
    if (options instanceof Array) {
      this.config['options'] = options
    }
    this.visible = true
    this.setLoad((options) => {
      this.config['options'] = options
    })
  }
}