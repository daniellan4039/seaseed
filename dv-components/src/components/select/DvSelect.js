import {defineComponent} from "vue";
import { DvSelect } from '../common/ComponentDefine'

export default defineComponent({
    name: 'DvSelect',
    props: {
        def: {
            type: DvSelectk
        }
    },
    render () {
        return <a-select style='width: 300px;'>
            <a-select-option value='1'>Default Selection 1</a-select-option>
        </a-select>
    }
})
