// eslint-disable-next-line no-unused-vars
import {PlusOutlined, SettingOutlined, ShrinkOutlined} from "@ant-design/icons-vue";

export default {
    name: 'CusTableOpsBar',
    components: {
        PlusOutlined
    },
    props: {},
    render: function () {
        const shrinkTitle = {
            title: () => '密度'
        }
        const settingTitle = {
            title: () => '设置'
        }
        const shrinkMenuSlot = {
            overlay: () => <a-menu>
                <a-menu-item>默认</a-menu-item>
                <a-menu-item>中等</a-menu-item>
                <a-menu-item>紧凑</a-menu-item>
            </a-menu>
        }
        return <div className='table-ops-bar-container'>
            <a-button type='primary'>
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
                <a-tooltip v-slots={settingTitle}>
                    <span class='setting-btn'>
                        <SettingOutlined/>
                    </span>
                </a-tooltip>
            </div>
        </div>
    }
}
