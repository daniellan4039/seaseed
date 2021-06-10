// eslint-disable-next-line no-unused-vars
import {h, reactive, ref} from "vue";
import _ from 'lodash'

export default {
    name: 'CusForm',
    props: {
        formDef: {
            type: Object,
            required: true
        },
        defaultModel: {
            type: Object,
            default: null
        }
    },
    setup(props) {
        //fixme: 这里可能会有问题, 待验证
        const formRef = ref(props.formDef.formRef)

        const parseFormModel = (formItems) => {
            let formModel = {}
            if (formItems instanceof Array) {
                formItems.forEach(i => {
                    formModel[i.key] = null
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
            // return loadDefaultModel(parsedModel ?? {}, props.defaultModel ?? {})
            return parsedModel
        }

        const getRules = () => {
            return parseFormRules(props.formDef?.formItems)
        }

        const formModel = reactive(getFormModel())
        const rules = reactive(getRules())

        return {
            formRef,
            formModel,
            rules,
            parseFormModel,
            parseFormRules,
            loadDefaultModel,
            getFormModel,
            getRules
        }
    },
    render() {
        const {formItems} = this.formDef
        const {formModel, formRef, rules, formDef} = this
        const formItemsDOM = formItems.map(i => {
            return h(
                <a-form-item></a-form-item>,
                {
                    ref: i.key,
                    name: i.key,
                    label: i.label
                },
                {
                    default: () => {
                        let input
                        switch (i.inputType) {
                            case 'input:string':
                                input = h(
                                    <a-input></a-input>,
                                    {
                                        placeholder: i.placeholder,
                                        value: formModel[i.key],
                                        onChange: $event => formModel[i.key] = $event.target.value
                                    }
                                )
                                break
                            case 'select':
                                input = h(
                                    <a-select></a-select>,
                                    {
                                        placeholder: i.placeholder,
                                        value: formModel[i.key],
                                        onChange: val => formModel[i.key] = val
                                    },
                                    {
                                        default: () => {
                                            return i?.meta.options?.map(o => {
                                                return h(
                                                    <a-select-option>{o.text}</a-select-option>,
                                                    {
                                                        value: o.value
                                                    }
                                                )
                                            })
                                        }
                                    }
                                )

                        }
                        return input
                    }
                }
            )
        })


        return h(
            <a-form></a-form>,
            {
                ref: formRef,
                model: formModel,
                rules: rules,
                labelCol: formDef.labelCol ?? {span: 4},
                wrapperCol: formDef.wrapperCol ?? {span: 14}
            },
            {
                default: () => formItemsDOM
            }
        )
    }
}
