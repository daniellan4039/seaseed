import {h, reactive, ref, resolveComponent} from "vue"
import _ from 'lodash'
import {Modal} from "ant-design-vue";
import CusFormInput from "@/components/form/CusFormInput";
import store from '@/store/index'
import {validateWithFullPath} from "@/service/validatorApi";

export default {
    name: 'CusForm',
    props: {
        formDef: {
            type: Object,
            required: true
        },
        thresholdCols: {
            type: Number,
            default: 8
        },
        maxCols: {
            type: Number,
            default: 3
        },
        showGroupTitle: {
            type: Boolean,
            default: true
        },
        submitText: {
            type: String,
            default: '提交'
        }
    },
    emits: ['submit'],
    components: {
        CusFormInput
    },
    setup(props, ctx) {
        const formRef = ref()
        const defaultModel = ref({})
        const formKeys = []
        const rules = ref({})
        const groupedFormItems = ref({})

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
        const getRules = async () => {
            let backRules = []
            if (props.formDef?.api?.saveUrl) {
                backRules = await validateWithFullPath(props.formDef.api.saveUrl)
            }
            rules.value = _.assignInWith(parseFormRules(props.formDef?.formItems), backRules, (obj, src) => {
                return [...obj ?? [], ...src]
            })
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
            formRef.value?.validate().then(() => {
                let pickedModel = _.pick(formModel, formKeys)
                if (!defaultModel.value) {
                    props.formDef?.actions?.save(pickedModel).then(res => handleResult(res))
                } else {
                    props.formDef?.actions?.update(pickedModel).then(res => handleResult(res))
                }
                ctx.emit('submit', pickedModel)
            }).catch((e) => {
                Modal.error({
                    title: '提示',
                    content: '请完善表格'
                })
                console.warn(e)
            })
        }
        const resetForm = () => {
            formRef.value.resetFields();
        }

        let formModel = reactive(getFormModel())

        props.formDef.formItems.forEach(i => {
            const groupName = i.meta.group
            if (!groupedFormItems.value[groupName]?.length) {
                groupedFormItems.value[groupName] = []
            }
            groupedFormItems.value[groupName].push(i)
        })

        getRules()

        return {
            formRef,
            formModel,
            rules,
            defaultModel,
            groupedFormItems,
            parseFormModel,
            parseFormRules,
            loadDefaultModel,
            getFormModel,
            getRules,
            submitForm,
            resetForm
        }
    },
    render() {
        const submitSlot = this.$slots['submit']
        const formItemCount = this.formDef.formItems.length
        const singleColumn = formItemCount <= this.thresholdCols
        let labelSpan = 8
        let wrapperSpan = 16
        let formItemsDOM = []
        for (const key in this.groupedFormItems) {
            this.showGroupTitle && formItemsDOM.push(
                <a-row>
                    <a-col span={singleColumn ? 0 : 24}>
                        <a-divider type='horizontal' orientation='left'>
                            {key}
                        </a-divider>
                    </a-col>
                </a-row>
            )
            const groupDom = this.groupedFormItems[key]?.map(i => {
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
                    labelSpan = i?.meta?.labelSpan ? i.meta.labelSpan : singleColumn ? 9 : this.formDef.labelCol??8
                    wrapperSpan = i?.meta?.wrapperSpan ? i.meta.wrapperSpan : singleColumn ? 4 : this.formDef.wrapperCol??16
                    return h(
                        resolveComponent('a-col'),
                        {
                            xs: {span: 24},
                            sm: {span: 24},
                            md: {span: 24},
                            lg: {span: 24},
                            xl: {span: i?.meta?.span ? i.meta.span : singleColumn ? 24 : Math.ceil(24/(this.maxCols-1))},
                            xxl: {span: i?.meta?.span ? i.meta.span : singleColumn ? 24 : Math.ceil(24/this.maxCols)},
                        },
                        () => h(
                            resolveComponent('a-form-item'),
                            {
                                ref: i.key,
                                name: i.key,
                                label: i.label,
                                labelCol: { span : labelSpan },
                                wrapperCol: { span: wrapperSpan},
                            },
                            {
                                default: () => {
                                    if (slot) {
                                        return slot(i)
                                    } else {
                                        return h(
                                            CusFormInput,
                                            {
                                                'item': i,
                                                'modelValue': this.formModel[i.key],
                                                'text': this.formModel?.echoMap?.[i.key],
                                                'changedKey': this.formModel[i.changeBy],
                                                'onUpdate:modelValue': val => this.formModel[i.key] = val
                                            }
                                        )
                                    }
                                }
                            }
                        )
                    )
                } else {
                    return null
                }
            })
            formItemsDOM.push(
                h(
                    resolveComponent('a-row'),
                    {},
                    {
                        default: () => groupDom
                    }
                )
            )
        }

        const submitButton = h(
            resolveComponent('a-row'),
            {
                class: 'cus-form-submit-bar'
            },
            () => h(
                resolveComponent('a-col'),
                {
                    span: 24
                },
                {
                    default: () => h(
                        resolveComponent('a-form-item'),
                        {
                            wrapperCol: {
                                span: wrapperSpan,
                                offset: labelSpan
                            },
                            style: {textAlign: 'right'}
                        },
                        () => {
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
                                            default: () => this.submitText
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
                    )
                }
            )
        )

        formItemsDOM.push(
            submitButton
        )
        return h(
            resolveComponent('a-form'),
            {
                ref: 'formRef',
                model: this.formModel,
                rules: this.rules,
                ...this.formDef.config,
                className: 'cus-form'
            },
            {
                default: () => formItemsDOM
            }
        )
    }
}
