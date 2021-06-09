import {
    Breadcrumb,
    Button,
    Checkbox,
    ConfigProvider,
    Dropdown,
    Input,
    Layout,
    Menu,
    Table,
    Tabs,
    Typography
} from "ant-design-vue";

export default {
    install: (app) => {
        app.use(Button)
        app.use(Input)
        app.use(Checkbox)
        app.use(Layout)
        app.use(Menu)
        app.use(Typography)
        app.use(Tabs)
        app.use(Breadcrumb)
        app.use(Dropdown)
        app.use(Table)
        app.use(ConfigProvider)
    }
}
