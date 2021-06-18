import {
    PlusOutlined,
    SettingOutlined,
    ShrinkOutlined,
    VerticalAlignBottomOutlined,
    VerticalAlignTopOutlined
} from "@ant-design/icons-vue";
import {reactive, ref, toRefs, watch} from "vue";

export default {
    name: 'CusTableOpsBar',
    components: {
        PlusOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined
    },
    props: ['columns', 'density', 'tableKey'],
    emits: ['add', 'settingChange', 'update:density'],
    setup(props, ctx) {
        const columnsWrapper = ref(props.columns)
        const columnKeyWrapper = ref([])
        const densityWrapper = ref(props.density)

        try {
            const tableSetting = JSON.parse(localStorage.getItem('HRMS_TABLE_SETTING') ?? '{}')
            if (tableSetting) {
                const thisTable = tableSetting[props.tableKey]
                if (thisTable) {
                    columnsWrapper.value = thisTable.columns
                    densityWrapper.value = thisTable.density
                } else {
                    columnsWrapper.value.forEach(c => {
                        c.checked = true
                    })
                }
                columnsWrapper.value.forEach(i => {
                    i.checked && columnKeyWrapper.value.push(i.dataIndex)
                })
            }
            ctx.emit('settingChange', columnKeyWrapper.value)
            ctx.emit('update:density', densityWrapper.value)
            console.log(columnKeyWrapper.value)
        } catch (e) {
            localStorage.removeItem('HRMS_TABLE_SETTING')
            columnsWrapper.value.forEach(c => {
                c.checked = true
            })
        }

        const onAddBtnClick = () => {
            ctx.emit('add')
        }
        const onDensityBtnClick = (arg) => {
            const {key} = arg
            densityWrapper.value = key
            onSettingConfirm()
        }
        const settingState = reactive({
            visible: false,
            indeterminate: false,
            checkAll: true
        })
        const onSettingConfirm = () => {
            settingState.visible = false
            let setting
            try {
                setting = JSON.parse(localStorage.getItem('HRMS_TABLE_SETTING') ?? '{}')
            } catch (e) {
                setting = {}
            }
            if (props.tableKey) {
                setting[props.tableKey] = {
                    columns: columnsWrapper.value,
                    density: densityWrapper.value
                }
                localStorage.setItem('HRMS_TABLE_SETTING', JSON.stringify(setting))
            }
            ctx.emit('update:density', densityWrapper.value)
            ctx.emit('settingChange', columnKeyWrapper.value)

        }
        const onSettingCancel = () => {
            columnsWrapper.value.forEach(c => {
                c.checked = true
            })
            densityWrapper.value = 'default'
            settingState.visible = false
            onSettingConfirm()
        }
        const onSettingCheckAll = () => {
            const checked = settingState.checkAll
            columnsWrapper.value.forEach(c => {
                c.checked = checked
            })
        }

        const exchangeEle = (array, start, direction) => {
            return array.splice(start, 1, ...array.splice(start + direction, 1, array[start]))
        }

        const onColumnWrapperChange = (nv) => {
            let checked = 0
            columnKeyWrapper.value = []
            nv.forEach(c => {
                c.checked && checked++ && columnKeyWrapper.value.push(c.dataIndex)
            })
            settingState.indeterminate = checked > 0 && checked < columnsWrapper.value.length
            ctx.emit('settingChange', columnKeyWrapper.value)
        }

        watch(columnsWrapper.value, (nv) => {
            let checked = 0
            columnKeyWrapper.value = []
            nv.forEach(c => {
                c.checked && checked++
                if (c.checked) {
                    columnKeyWrapper.value.push(c.dataIndex)
                }
            })
            settingState.indeterminate = checked > 0 && checked < columnsWrapper.value.length
            ctx.emit('settingChange', columnKeyWrapper.value)
        })

        return {
            onAddBtnClick,
            onDensityBtnClick,
            onSettingConfirm,
            onSettingCancel,
            onSettingCheckAll,
            exchangeEle,
            onColumnWrapperChange,
            columnsWrapper,
            columnKeyWrapper,
            densityWrapper,
            ...toRefs(settingState)
        }
    },
    mounted() {
        // this.init()
    },
    render: function () {
        const {onAddBtnClick, onDensityBtnClick} = this
        const shrinkTitle = {
            title: () => '密度'
        }
        const settingTitle = {
            title: () => '设置'
        }
        const shrinkMenuSlot = {
            overlay: () => <a-menu onClick={onDensityBtnClick}>
                <a-menu-item key='default'>默认</a-menu-item>
                <a-menu-item key='middle'>中等</a-menu-item>
                <a-menu-item key='small'>紧凑</a-menu-item>
            </a-menu>
        }
        const clms = this.columnsWrapper?.map((c, k) => {
            return <a-menu-item key={c.key} class='flex-space-between'>
                <a-checkbox v-model={[c.checked, 'checked']}>
                    {c.title}
                </a-checkbox>
                <span>
                    <VerticalAlignTopOutlined onClick={() => this.exchangeEle(this.columnsWrapper, k, -1)}
                                              class='holder-bright'/>
                    <VerticalAlignBottomOutlined onClick={() => this.exchangeEle(this.columnsWrapper, k, 1)}/>
                </span>
            </a-menu-item>
        })

        const clmsMenuSlot = {
            overlay: () => <a-menu>
                <a-menu-item>
                    <a-checkbox indeterminate={this.indeterminate} onChange={this.onSettingCheckAll}
                                v-model={[this.checkAll, 'checked']}>全选
                    </a-checkbox>
                </a-menu-item>
                {clms}
                <a-menu-item style={{textAlign: 'right'}} class='flex-space-around'>
                    <a-button size='small' onClick={this.onSettingCancel}>重置</a-button>
                    <a-button type='primary' size='small' onClick={this.onSettingConfirm}>保存</a-button>
                </a-menu-item>
            </a-menu>
        }

        return <div className='table-ops-bar-container'>
            <a-button type='primary' onClick={onAddBtnClick}>
                <PlusOutlined/>
                新增
            </a-button>
            <div class='table-setting-block'>
                <a-dropdown v-slots={shrinkMenuSlot} trigger={['click']}>
                    <a-tooltip v-slots={shrinkTitle}>
                        <span class='setting-btn'>
                            <ShrinkOutlined/>
                        </span>
                    </a-tooltip>
                </a-dropdown>
                <a-dropdown v-slots={clmsMenuSlot} trigger={['click']} v-model={[this.visible, 'visible']}>
                    <a-tooltip v-slots={settingTitle}>
                        <span class='setting-btn'>
                            <SettingOutlined/>
                        </span>
                    </a-tooltip>
                </a-dropdown>

            </div>
        </div>
    }
}
