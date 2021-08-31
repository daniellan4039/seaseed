import DvButton from './button/DvButton'

export default {
  install: (app, option) => {
    app.component(DvButton.name, DvButton)
  }
}
