import DvButton from "./button/DvButton";

export default {
    DvButton,
    install: (app) => {
        app.use(DvButton)
    }
}
