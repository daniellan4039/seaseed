import DvSelectDef from '@/lib/form/DvSelectDef'

export class DvFiDef extends DvSelectDef {

  inputType

  constructor (key, label, type) {
    super(key, label, [])
    this.inputType = type
  }
}
