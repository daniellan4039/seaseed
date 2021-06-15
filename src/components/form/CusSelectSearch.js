import {MenuOutlined} from "@ant-design/icons-vue";

export default {
    name: 'CusSelectSearch',
    props: ['value', 'def'],
    emits: ['change'],
    components: {
        MenuOutlined
    },
    setup() {
        const onMore = () => {
        }
        return {
            onMore
        }
    },
    render() {
        const self = this
        const slots = {
            suffixIcon: () => <MenuOutlined onClick={self.onMore}/>
        }
        return <a-select show-search v-slots={slots}>
            <a-select-option value='sss'>sss</a-select-option>
        </a-select>
    }
}
