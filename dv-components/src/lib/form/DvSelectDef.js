import DvInputDef from './DvInputDef'

export default class DvSelectDef extends DvInputDef{

  options = []

  constructor (key,label, options) {
    super(key, label)
    this.options = options
  }

  setOptions(options) {
    this.options = options
  }

  reload(data){
    this.options = data
  }
}
