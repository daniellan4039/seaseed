import {defineComponent} from "vue";

export default defineComponent({
    name: 'DvSelect',
    props: {},
    render () {
        return <a-select style='width: 300px;'>
            <a-select-option value='1'>Default Selection 1</a-select-option>
        </a-select>
    }
})
