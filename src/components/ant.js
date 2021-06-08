import {Button, Checkbox, Input, Layout, Menu, Tabs, Typography} from "ant-design-vue";

export default {
    install: (app) => {
        app.use(Button)
        app.use(Input)
        app.use(Checkbox)
        app.use(Layout)
        app.use(Menu)
        app.use(Typography)
        app.use(Tabs)
    }
}
