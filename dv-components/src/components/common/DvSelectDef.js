import { DvInput } from './DvInput'

/**
 * Select definition.
 * key, unique key
 * config, official component configs
 * options, selection options
 * visible, whether this object be visible
 */
export class DvSelectDef extends DvInput {
  constructor(key, config, options) {
    super(key, config)
    if (options instanceof Array) {
      this.options = options
    }
    this.visible = true
  }

  setOptions(options) {
    this.options = options
  }

  toggleVisible() {
    this.visible = !this.visible
  }
}