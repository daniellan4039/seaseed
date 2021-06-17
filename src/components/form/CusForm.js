import {h, reactive, ref, resolveComponent} from "vue"
import _ from 'lodash'
import {Modal} from "ant-design-vue";
import CusFormInput from "@/components/form/CusFormInput";
import store from '@/store/index'

export default {
    name: 'CusForm',
    props: {
        formDef: {
            type: Object,
            required: true
        }
    },
    components: {
        CusFormInput
    },
    setup(props) {
        const formRef = ref()
        const defaultModel = ref({})
        //set defaultModel from vuex
        if (props.formDef.store) {
            const module = props.formDef.store?.module
            const key = props.formDef.store?.key
            module && key && (defaultModel.value = store.state[module][key])
        }
        const parseFormModel = (formItems) => {
            let formModel = {}
            if (formItems instanceof Array) {
                formItems.forEach(i => {
                    formModel[i.key] = i?.default
                })
            }
            return formModel
        }
        const loadDefaultModel = (formModel, defaultModel) => {
            return _.assign(formModel, defaultModel)
        }

        const parseFormRules = (formItems) => {
            let rules = {}
            if (formItems instanceof Array) {
                formItems.forEach(i => {
                    rules[i.key] = i.rules
                })
            }
            return rules
        }

        const getFormModel = () => {
            const parsedModel = parseFormModel(props.formDef?.formItems)
            return loadDefaultModel(parsedModel ?? {}, defaultModel.value ?? {})
        }

        const getRules = () => {
            return parseFormRules(props.formDef?.formItems)
        }

        const handleResult = (res) => {
            const {isSuccess, msg} = res
            if (isSuccess) {
                Modal.success({
                    title: '提示',
                    content: msg
                })
            } else {
                Modal.warning({
                    title: '提示',
                    content: msg
                })
            }
        }

        const submiForm = () => {
            formRef.value.validate().then(() => {
                if (!defaultModel.value) {
                    props.formDef?.actions?.save(formModel).then(res => handleResult(res))
                } else {
                    props.formDef?.actions?.update(formModel).then(res => handleResult(res))
                }
            }).catch(() => {
                Modal.error({
                    title: '提示',
                    content: '请完善表格'
                })
            })
        }

        const resetForm = () => {
            formRef.value.resetFields();
        }

        const formModel = reactive(getFormModel())
        const rules = reactive(getRules())

        return {
            formRef,
            formModel,
            rules,
            defaultModel,
            parseFormModel,
            parseFormRules,
            loadDefaultModel,
            getFormModel,
            getRules,
            submiForm,
            resetForm,
        }
    },
    render() {
        const {formItems} = this.formDef
        const {formModel, rules, formDef, submiForm, resetForm} = this
        const formItemsDOM = formItems.map(i => {
            return h(
                resolveComponent('a-form-item'),
                {
                    ref: i.key,
                    name: i.key,
                    label: i.label
                },
                {
                    default: () => {
                        return h(
                            CusFormInput,
                            {
                                item: i,
                                'modelValue': formModel[i.key],
                                'onUpdate:modelValue': val => formModel[i.key] = val
                            }
                        )
                    }
                }
            )
        })

        const submitButton = h(
            resolveComponent('a-form-item'),
            {
                wrapperCol: {span: formDef.wrapperCol, offset: formDef.labelCol}
            },
            {
                default: () => {
                    return [
                        h(
                            resolveComponent('a-button'),
                            {
                                type: 'primary',
                                onClick: submiForm
                            },
                            {
                                default: () => '保存'
                            }
                        ),
                        h(
                            resolveComponent('a-button'),
                            {
                                style: 'margin-left: 10px;',
                                onClick: resetForm
                            },
                            {
                                default: () => '重置'
                            }
                        )
                    ]
                }
            }
        )

        return h(
            resolveComponent('a-form'),
            {
                ref: 'formRef',
                model: formModel,
                rules: rules,
                labelCol: {span: formDef.labelCol ?? 4},
                wrapperCol: {span: formDef.wrapperCol ?? 14},
                ...formDef.config
            },
            {
                default: () => {
                    return [
                        formItemsDOM,
                        submitButton
                    ]
                }
            }
        )
    }
}
