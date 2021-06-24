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
        const formKeys = []
        if (props.formDef.store) {
            const module = props.formDef.store?.module
            const key = props.formDef.store?.key
            module && key && (defaultModel.value = store.state[module][key])
        }
        const parseFormModel = (formItems) => {
            let formModel = {}
            if (formItems instanceof Array) {
                formKeys.length = 0
                formItems.forEach(i => {
                    const submit = i.meta?.submit
                    const scope = i.meta?.scope?.includes('form')
                    if (submit && scope) {
                        formModel[i.key] = i?.default
                        formKeys.push(i.key)
                    }
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
        const submitForm = () => {
            formRef.value.validate().then(() => {
                let pickedModel = _.pick(formModel, formKeys)
                if (!defaultModel.value) {
                    props.formDef?.actions?.save(pickedModel).then(res => handleResult(res))
                } else {
                    props.formDef?.actions?.update(pickedModel).then(res => handleResult(res))
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

        let formModel = reactive(getFormModel())
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
            submitForm,
            resetForm,
        }
    },
    render() {
        const submitSlot = this.$slots['submit']
        const formItemsDOM = this.formDef.formItems.map(i => {
            const scope = i.meta?.scope?.includes('form')
            const dependency = i.dependency
            let continueByDp = true
            const slot = this.$slots[i.key]
            dependency && dependency.forEach(d => {
                if (d.condition === 'include') {
                    continueByDp = continueByDp && d.value.includes(this.formModel[d.key])
                } else {
                    continueByDp = continueByDp && !d.value.includes(this.formModel[d.key])
                }
            })
            if (scope && continueByDp) {
                return h(
                    resolveComponent('a-form-item'),
                    {
                        ref: i.key,
                        name: i.key,
                        label: i.label
                    },
                    {
                        default: () => {
                            if (slot) {
                                return slot(i)
                            } else {
                                return h(
                                    CusFormInput,
                                    {
                                        item: i,
                                        'modelValue': this.formModel[i.key],
                                        'onUpdate:modelValue': val => this.formModel[i.key] = val
                                    }
                                )
                            }
                        }
                    }
                )
            } else {
                return null
            }

        })

        const submitButton = h(
            resolveComponent('a-form-item'),
            {
                wrapperCol: {span: this.formDef.wrapperCol, offset: this.formDef.labelCol}
            },
            {
                default: () => {
                    if (submitSlot) {
                        return submitSlot(this.formRef)
                    } else {
                        return [
                            h(
                                resolveComponent('a-button'),
                                {
                                    type: 'primary',
                                    onClick: this.submitForm
                                },
                                {
                                    default: () => '保存'
                                }
                            ),
                            h(
                                resolveComponent('a-button'),
                                {
                                    style: 'margin-left: 10px;',
                                    onClick: this.resetForm
                                },
                                {
                                    default: () => '重置'
                                }
                            )
                        ]
                    }
                }
            }
        )
        return h(
            resolveComponent('a-form'),
            {
                ref: 'formRef',
                model: this.formModel,
                rules: this.rules,
                labelCol: {span: this.formDef.labelCol ?? 4},
                wrapperCol: {span: this.formDef.wrapperCol ?? 14},
                ...this.formDef.config
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
