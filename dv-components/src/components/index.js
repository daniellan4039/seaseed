import DvButton from "@/components/button/DvButton";
import DvSelect from "@/components/select/index";

export default {
    install: (app) => {
        app.component(DvButton.name, DvButton)
        app.use(DvSelect)
    }
}
