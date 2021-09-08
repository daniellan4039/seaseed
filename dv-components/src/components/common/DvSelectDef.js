import { DvInput } from './DvInput'

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