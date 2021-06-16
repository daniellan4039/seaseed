import {
    Breadcrumb,
    Button,
    Checkbox, Col,
    ConfigProvider, Divider,
    Dropdown, Form,
    Input,
    Layout,
    Menu, Modal, Row, Select, Space,
    Table,
    Tabs, Tooltip,
    Typography
} from "ant-design-vue";

export default {
    install: (app) => {
        app.use(Button)
        app.use(Input)
        app.use(Select)
        app.use(Checkbox)
        app.use(Layout)
        app.use(Menu)
        app.use(Typography)
        app.use(Tabs)
        app.use(Breadcrumb)
        app.use(Dropdown)
        app.use(Table)
        app.use(ConfigProvider)
        app.use(Form)
        app.use(Modal)
        app.use(Tooltip)
        app.use(Row)
        app.use(Col)
        app.use(Space)
        app.use(Divider)
    }
}
