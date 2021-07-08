import {api, get} from '@/service/uploadApi'
import {inject, reactive, ref} from "vue";
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
        const fileList = ref([])
        const formModel = inject('formModel', {})
        props?.fileList?.forEach(i => {
            let requestData = new FormData()
            requestData.set('paths', i.attachment)
            get(requestData).then(res => {
                const {isSuccess, data} = res
                isSuccess && fileList.value.push(
                    {
                        uid: i.id,
                        name: i.title,
                        status: 'done',
                        url: data[0],
                        contentType: i.fileType,
                        path: i.attachment,
                        size: i.fileSize,
                        type: i.fileType
                    }
                )
            })
        })

        const data = reactive({
            functionPoint: 'hrms'
        })
        const headers = reactive({
            token: `Bearer ${localStorage.getItem('HRMS_USER_TOKEN')}`,
            app_id: '68816749155319814',
        })
        const onChange = info => {
            fileList.value = info.fileList
            const doneFiles = info.fileList.filter(file => file.status === 'done')
            if (doneFiles && doneFiles.length > 0) {
                const attachmentList = info.fileList.map(i => {
                    const {data} = i.response ?? {isSuccess: false, data: null}
                    return {
                        attachmentType: data?.contentType??i.contentType,
                        attachment: data?.path??i.path,
                        title: i.name,
                        fileSize: i.size,
                        fileType: i.type,
                        id: formModel?.id
                    }
                })
                ctx.emit('update:fileList', attachmentList)
            }
        }
        return {
            api,
            fileList,
            data,
            headers,
            onChange
        }
    },
    render() {
        return <a-upload
            action={this.api.uploadUrl}
            multiple={this.multiple}
            fileList={this.fileList}
            onChange={this.onChange}
            headers={this.headers}
            data={this.data}
        >
            <a-button>
                <UploadOutlined/>
                上传
            </a-button>
        </a-upload>
    }
}
