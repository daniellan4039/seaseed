import {
    PlusOutlined,
    SettingOutlined,
    ShrinkOutlined,
    VerticalAlignBottomOutlined,
    VerticalAlignTopOutlined
} from "@ant-design/icons-vue";
import {reactive, ref, toRef, toRefs, watch} from "vue";
import {exchangeEleFromArray} from '@/funcLib/arrayFunc'

export default {
    name: 'CusTableOpsBar',
    components: {
        PlusOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined
    },
    props: ['columns', 'density', 'tableKey', 'enableAdd'],
    emits: ['add', 'settingChange', 'update:density'],
    setup(props, ctx) {
        const refColumns = reactive(props.columns)
        const refDensity = ref(props.density)
        const refTableKey = toRef(props, 'tableKey')
        const settingState = reactive({
            visible: false,
            indeterminate: false,
            checkAll: true
        })

        const onAddBtnClick = () => {
            ctx.emit('add')
        }
        const onDensityBtnClick = (arg) => {
            const {key} = arg
            refDensity.value = key
            onSettingConfirm()
        }
        const onSettingConfirm = () => {
            const clmKeys = retriveColumnKeys(refColumns)
            const memery = JSON.parse(localStorage.getItem('HRMS_TABLE_SETTING') ?? '{}')
            if (!memery[refTableKey.value]) {
                memery[refTableKey.value] = {}
            }
            memery[refTableKey.value]['columns'] = clmKeys
            memery[refTableKey.value]['density'] = refDensity.value
            localStorage.setItem('HRMS_TABLE_SETTING', JSON.stringify(memery))
            settingState.visible = false
        }
        const onSettingCancel = () => {
            refColumns.forEach(c => {
                c.checked = true
            })
            refDensity.value = 'default'
            settingState.visible = false
            // onSettingConfirm()
        }
        const onSettingCheckAll = () => {
            const checked = settingState.checkAll
            refColumns.forEach(c => {
                c.checked = checked
            })
        }
        const onExchange = (index, upOrDown) => {
            exchangeEleFromArray(refColumns, index, upOrDown)
        }
        const retriveColumnKeys = (refColumns) => {
            return refColumns.map(c => {
                if (c.checked) {
                    return c.dataIndex
                }
            })
        }

        watch(refColumns, (nv) => {
            let allChecked = true
            let checkedCount = 0
            refColumns.forEach(c => {
                allChecked = c.checked && allChecked
                c.checked && checkedCount++
            })
            settingState.checkAll = allChecked
            settingState.indeterminate = checkedCount > 0 && checkedCount < refColumns.length
            const clmKeys = retriveColumnKeys(nv)
            ctx.emit('settingChange', clmKeys)
        })
        watch(refDensity, (nv) => {
            ctx.emit('update:density', nv)
        })

        // ?????????
        const memery = JSON.parse(localStorage.getItem('HRMS_TABLE_SETTING') ?? '{}')?.[refTableKey.value]
        if (memery) {
            if(memery.columns) {
                memery.columns.forEach(c => {
                    const matchedColumn = refColumns.find(i => i.dataIndex === c)
                    c && matchedColumn && (matchedColumn.checked = true)
                })
            }
            refDensity.value = memery.density ?? 'default'
        } else{
            refColumns.forEach(c => {
                c.checked = true
            })
            if (!props.density) {
                refDensity.value = 'default'
            }
        }

        return {
            onAddBtnClick,
            onDensityBtnClick,
            onSettingConfirm,
            onSettingCancel,
            onSettingCheckAll,
            onExchange,
            ...toRefs(settingState),
            refColumns,
            refDensity
        }
    },
    render: function () {
        let self = this
        const shrinkTitle = {
            title: () => '??????'
        }
        const settingTitle = {
            title: () => '??????'
        }
        const shrinkMenuSlot = {
            overlay: () => <a-menu onClick={self.onDensityBtnClick}>
                <a-menu-item key='default'>??????</a-menu-item>
                <a-menu-item key='middle'>??????</a-menu-item>
                <a-menu-item key='small'>??????</a-menu-item>
            </a-menu>
        }
        const clms = this.refColumns?.map((c, k) => {
            return <a-menu-item key={c.key} class='flex-space-between'>
                <a-checkbox v-model={[c.checked, 'checked']}>
                    {c.title}
                </a-checkbox>
                <span>
                    <VerticalAlignTopOutlined onClick={() => this.onExchange(k, -1)}/>
                    <VerticalAlignBottomOutlined onClick={() => this.onExchange(k, 1)}/>
                </span>
            </a-menu-item>
        })

        const clmsMenuSlot = {
            overlay: () => <a-menu>
                <a-menu-item>
                    <a-checkbox indeterminate={this.indeterminate} onChange={this.onSettingCheckAll}
                                v-model={[this.checkAll, 'checked']}>??????
                    </a-checkbox>
                </a-menu-item>
                {clms}
                <a-menu-item style={{textAlign: 'right'}} class='flex-space-around'>
                    <a-button size='small' onClick={this.onSettingCancel}>??????</a-button>
                    <a-button type='primary' size='small' onClick={this.onSettingConfirm}>??????</a-button>
                </a-menu-item>
            </a-menu>
        }

        const add = self.enableAdd && <a-button type='primary' onClick={self.onAddBtnClick}>
            <PlusOutlined/>
            ??????
        </a-button> || <span/>

        const otherOps = <span>
            {this.$slots.otherOps ? this.$slots.otherOps() : ''}
        </span>

        return <div className='table-ops-bar-container'>
            <span>
                {add}
                {otherOps}
            </span>
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
