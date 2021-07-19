import {api, get} from '@/service/uploadApi'
import {reactive, ref} from "vue";
import {UploadOutlined, PlusOutlined} from "@ant-design/icons-vue";

export default {
    name: 'CusUpload',
    props: {
        fileList: Array,
        action: {
            type: String,
            default: 'def'
        },
        multiple: {
            type: Boolean,
            default: true
        },
        listType: {
            type: String,
            default: 'text'
        },
        enableUpload: {
            type: Boolean,
            default: true
        },
        text: {
            type: String,
            default: '上传'
        },
        style: {},
        showUploadList: {
            type: Boolean,
            default: true
        },
        customRequest: {
            type: Function,
            default: null
        },
        beforeUpload: {
            type: Function,
            default: null
        },
        limitCount: {
            type: Number,
            default: 10
        }
    },
    emits: [
        'update:fileList'
    ],
    components: {
        UploadOutlined, PlusOutlined
    },
    setup(props, ctx) {
        const fileList = ref([])
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
                    i.url = data?.url
                    return {
                        attachmentType: data?.contentType ?? i.contentType,
                        attachment: data?.path ?? i.path,
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
            fileList,
            data,
            headers,
            onChange
        }
    },
    render() {
        const action = this.enableUpload ? this.api.uploadUrl : null
        let ops = <a-button>
            <UploadOutlined />
            {this.text}
        </a-button>

        if (this.listType === 'picture-card') {
            ops = <div>
                <plus-outlined />
                <div className="ant-upload-text">
                    {this.text}
                </div>
            </div>
        }

        this.fileList.length >= this.limitCount && (ops = null)

        return <a-upload
            action={action}
            customRequest={this.customRequest}
            beforeUpload={this.beforeUpload}
            multiple={this.multiple}
            fileList={this.fileList}
            onChange={this.onChange}
            headers={this.headers}
            data={this.data}
            listType={this.listType}
            style={this.style}
            showUploadList={this.showUploadList}
        >
            {ops}
        </a-upload>
    }
}
