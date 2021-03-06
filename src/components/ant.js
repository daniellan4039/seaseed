import {
    Breadcrumb,
    Button, Card,
    Checkbox, Col,
    ConfigProvider, DatePicker, Descriptions, Divider,
    Dropdown, Form, Image,
    Input, InputNumber,
    Layout, List,
    Menu, Modal, Pagination, Row, Select, Space, Spin,
    Table,
    Tabs, Tooltip, Tree, TreeSelect,
    Typography, Upload
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
        app.use(DatePicker)
        app.use(Descriptions)
        app.use(Spin)
        app.use(Pagination)
        app.use(Upload)
        app.use(TreeSelect)
        app.use(InputNumber)
        app.use(Tree)
        app.use(List)
        app.use(Image)
        app.use(Card)
    }
}
