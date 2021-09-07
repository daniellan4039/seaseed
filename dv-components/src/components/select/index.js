import DvSelect from "@/components/select/DvSelect";
export default {
    DvSelect,
    install: (app) => {
        app.component(DvSelect.name, DvSelect)
    }
}
