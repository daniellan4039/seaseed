import {VerticalAlignBottomOutlined, PlusOutlined, SettingOutlined, ShrinkOutlined, VerticalAlignTopOutlined} from "@ant-design/icons-vue";
import {reactive, toRefs, watch} from "vue";

export default {
    name: 'CusTableOpsBar',
    components: {
        PlusOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined
    },
    props: ['columns', 'density'],
    emits: ['add', 'settingChange', 'update:density'],
    setup(props, ctx) {
        const columnsWrapper = reactive(props.columns)
        columnsWrapper.forEach(c => {
            c.checked = true
        })
        const onAddBtnClick = () => {
            ctx.emit('add')
        }
        const onDensityBtnClick = (arg) => {
            ctx.emit('update:density', arg.key)
        }
        const settingState = reactive({
            visible: false,
            indeterminate: false,
            checkAll: true
        })
        const onSettingConfirm = () => {
            settingState.visible = false
        }
        const onSettingCancel = () => {
            columnsWrapper.forEach(c => {
                c.checked = true
            })
            settingState.visible = false
        }
        const onSettingCheckAll = () => {
            const checked = settingState.checkAll
            columnsWrapper.forEach(c => {
                c.checked = checked
            })
        }

        const exchangeEle = (array, start, direction) => {
            return array.splice(start, 1, ...array.splice(start+direction, 1, array[start]))
        }

        watch(columnsWrapper, (nv) => {
            let checked = 0
            let checkedKeys = []
            nv.forEach(c => {
                c.checked && checked++ && checkedKeys.push(c.dataIndex)
            })
            settingState.indeterminate = checked > 0 && checked < columnsWrapper.length
            ctx.emit('settingChange', checkedKeys)
        })

        return {
            onAddBtnClick,
            onDensityBtnClick,
            onSettingConfirm,
            onSettingCancel,
            onSettingCheckAll,
            exchangeEle,
            columnsWrapper,
            ...toRefs(settingState)
        }
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
                    <VerticalAlignTopOutlined onClick={() =>this.exchangeEle(this.columnsWrapper, k, -1)} class='holder-bright'/>
                    <VerticalAlignBottomOutlined onClick={() => this.exchangeEle(this.columnsWrapper, k, 1)}/>
                </span>
            </a-menu-item>
        })

        const clmsMenuSlot = {
            overlay: () => <a-menu>
                <a-menu-item>
                    <a-checkbox indeterminate={this.indeterminate} onChange={this.onSettingCheckAll} v-model={[this.checkAll, 'checked']}>全选</a-checkbox>
                </a-menu-item>
                {clms}
                <a-menu-item style={{textAlign: 'right'}} class='flex-space-around'>
                    <a-button size='small' onClick={this.onSettingCancel}>取消</a-button>
                    <a-button type='primary' size='small' onClick={this.onSettingConfirm}>确定</a-button>
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
