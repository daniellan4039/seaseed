import dvButton from './button/dv-button'

const components = [
  dvButton
]

const install = (app) => {
  components.forEach(com => {
    app.component(com.name, com)
  })
}

export default {
  install
}
