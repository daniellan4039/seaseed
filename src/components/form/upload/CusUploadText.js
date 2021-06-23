import { api } from '@/service/uploadApi'
// eslint-disable-next-line no-unused-vars
import {reactive, ref, toRef, toRefs} from "vue";
import {UploadOutlined} from "@ant-design/icons-vue";
export default {
    name: 'CusUploadText',
    props: {
        fileList: Array,
        action: {
            type: String,
            default: 'def'
        },
        multiple: {
            type: Boolean,
            default: true
        }
    },
    emits: [
        'update:fileList'
    ],
    components: {
        UploadOutlined
    },
    setup(props, ctx) {
        const fileList = toRef(props, 'fileList')
        const newFileList = ref([])
        fileList.value && (newFileList.value = [...fileList])
        const data = reactive({
            functionPoint: 'hrms'
        })
        const headers = reactive({
            token: `Bearer ${localStorage.getItem('HRMS_USER_TOKEN')}`,
            app_id: '68816749155319814',
        })
        const onChange = ({file}) => {
            if(file && file.status === 'done') {
                newFileList.value.push(
                    file
                )
                const attachmentList = newFileList.value.map(i => {
                    return {
                        attachmentType: '',
                        objectId: 0,
                        attachment: '',
                        title: i.name,
                        fileSize: i.size,
                        fileType: i.type
                    }
                })
                ctx.emit('update:fileList', attachmentList)
            }
        }
        return {
            api,
            newFileList,
            data,
            headers,
            onChange
        }
    },
    render() {
        return <a-upload
            action={this.api.uploadUrl}
            multiple={this.multiple}
            // fileList={this.newFileList}
            onChange={this.onChange}
            headers={this.headers}
            data={this.data}
        >
            <a-button>
                <UploadOutlined />
                上传
            </a-button>
        </a-upload>
    }
}
