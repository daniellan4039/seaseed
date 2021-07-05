import {h, ref} from "vue";

export default {
    name: 'CusSelectTree',
    props: {
        value: {},
        def: {
            type: Object,
            required: true
        },
        list: {
            type: Function,
            required: true
        }
    },
    emits: ['change'],
    setup(props) {
        const treeList = ref([])
        props.list().then(res => {
            treeList.value = res
        })
        return {
            treeList
        }
    },
    methods: {
        generateOptions (treeList) {
            return treeList.map(i => {
                let cNode = null
                if (i.children?.length > 0) {
                    cNode = this.generateOptions(i.children)
                }
                const pNode = h(
                    <a-tree-select-node />,
                    {
                        key: i.id,
                        value: i.id,
                        title: i.name
                    },
                    {
                        default: () => cNode
                    }
                )
                return pNode

            })
        }
    },
    render() {
        const optionsDom = this.generateOptions(this.treeList)
        return <a-tree-select
            value={this.value}
            onChange={(val) => {
                this.$emit('change', val)
            }}
            showSearch={true}
            allowClear={true}
            placeholder={this.def.placeholder}
        >
            {optionsDom}
        </a-tree-select>
    }
}
