import { userApi } from "@/service";

export const formDef = {
    key: 'loginForm',
    formType: 'normal',
    api: userApi.api,
    actions: {
        save: userApi.login,
        update: userApi.login
    },
    labelCol: 7,
    wrapperCol: 10,
    config: {

    },
    formRef: 'loginFormRef',
    formItems: [
        {
            key: 'account',
            label: '用户名',
            inputType: 'input:string',
            placeholder: '请输入用户名',
            default: '13984029019',
            rules: [
                {
                    required: true,
                    message: '用户名必填',
                    trigger: 'blur',
                    type: 'string'
                }
            ],
            meta: {
                submit: true,
                scope: ['form']
            }
        },
        {
            key: 'password',
            label: '密码',
            inputType: 'input:psw',
            placeholder: '请输入密码',
            default: '1234@abcd',
            rules: [
                {
                    required: true,
                    message: '密码必填',
                    trigger: 'blur',
                    type: 'string'
                }
            ],
            meta: {
                submit: true,
                scope: ['form']
            }
        },
    ]
}
