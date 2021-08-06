import {getByCode} from "@/service/dictionaryApi";
import {employeeApi} from "@/service";

export const tableDef = {
    key: 'EmployeeInfo',
    title: '职工中心',
    actions: {
        page: employeeApi.page,
    },
    defaultActions: {
        add: false,
        update: false,
        remove: false,
        detail: false
    },
    routes: {
        add: '/employee/formNew',
        edit: '/employee/formEdit',
        detail: '/employee/detail'
    },
    store: {
        module: 'employeeStore',
        key: 'employee',
        set: 'setEmployee'
    },
    config: {
        bordered: true,
        size: 'small'
    },
    searchParams: {
        meta: {
            gutter: 16,
            col: 6
        },
        formItems: [
            {
                key: 'realName',
                label: '职工姓名',
                inputType: 'input:string',
                placeholder: '请输入职工姓名',
                meta: {
                    submit: true,
                    scope: ['form', 'detail'],
                    group: '基本信息'
                }
            }
        ]
    },
    columns: [
        {
            title: '职工编号',
            dataIndex: 'employeeNo',
            width: 100,
            slots: {customRender: 'employeeNo'},
            ellipsis: true
        },
        {
            title: '职工姓名',
            dataIndex: 'realName',
            slots: {customRender: 'realName'},
            width: 120,
            ellipsis: true
        },
        {
            title: '职工性别',
            dataIndex: 'sex',
            slots: {customRender: 'sex'},
            width: 80,
            ellipsis: true
        },
        {
            title: '证件号码',
            dataIndex: 'certificationId',
            slots: {customRender: 'certificationId'},
            width: 170,
            ellipsis: true
        },
        {
            title: '所属组织',
            dataIndex: 'companyId',
            slots: {customRender: 'companyId'},
            width: 250,
            ellipsis: true
        },
        {
            title: '所属部门',
            dataIndex: 'departmentId',
            slots: {customRender: 'departmentId'},
            width: 170
        },
        {
            title: '职位',
            dataIndex: 'positionId',
            slots: {customRender: 'positionId'},
            width: 120
        },
        {
            title: '联系电话',
            dataIndex: 'telNum',
            width: 120,
            ellipsis: true,
            slots: {customRender: 'telNum'}
        },
        {
            title: '职工状态',
            dataIndex: 'status',
            slots: {customRender: 'status'},
            width: 90
        },
        {
            title: '创建时间',
            width: 180,
            dataIndex: 'createTime',
            slots: {customRender: 'createTime'}
        }
    ]
}

export function init() {
    return new Promise((resolve, reject) => {
        getByCode({
            codes: 'education,hr_professional_level'
        }).then(res => {
            const {isSuccess, data, msg} = res
            if (isSuccess) {
                resolve(data)
            } else {
                reject(msg)
            }
        })
    })
}

export function setPieOption(title, subTitle, seriesName, seriesData) {
    const myOption = {
        title: {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '50%',
                data: [
                    {value: 1048, name: '搜索引擎'},
                    {value: 735, name: '直接访问'},
                    {value: 580, name: '邮件营销'},
                    {value: 484, name: '联盟广告'},
                    {value: 300, name: '视频广告'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
    title && (myOption.title.text = title)
    subTitle && (myOption.title.subtext = subTitle)
    seriesName && (myOption.series[0].name = seriesName)
    seriesData && (myOption.series[0].data = seriesData)
    return myOption
}

export function setBarOption(xData, seriesData) {
    const myOption = {
        xAxis: {
            type: 'category',
            data: ['', '', '', '', '', '', ''],
            axisLabel: { interval: 0, rotate: 15 },
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [0, 0, 0, 0, 0, 0, 0],
            type: 'bar',
            label: {
                show: true,
                position: 'inside'
            }
        }]
    }

    xData && (myOption.xAxis.data = xData)
    seriesData && (myOption.series[0].data = seriesData)
    return myOption
}

export function getSexOption() {
    const sexSrc = {male: 0, female: 0}
    const sex = [{name: '男性', value: sexSrc.male}, {name: '女性', value: sexSrc.female}]
    return setPieOption('性别比例', '新增职工', '新增', sex)
}

export function getAgeOption() {
    const ageSrc = [0, 0, 0, 0, 0]
    const ageData = ['<30', '30-40', '40-50', '50以上', '未知']
    return setBarOption(ageData, ageSrc)
}

export function getEduOption() {
    let eduData = ['小学', '初中', '高中', '本科', '未知']
    let eduSrc = [0, 0, 0, 0, 0]
    return setBarOption(eduData, eduSrc)
}

export function getProOption() {
    let proData = ['初级', '中级', '高级', '未知']
    let proSrc = [0, 0, 0, 0]
    return setBarOption(proData, proSrc)
}


export function parseOption(data, type, title, subTitle){
    const {itemList} = data
    const keys = []
    const values = []
    switch (type) {
        case 'pie':
            itemList.forEach(i => {
                values.push({
                    name: i.itemTitle,
                    value: i.itemCount
                })
                keys.push(i.itemTitle)
            })
            return setPieOption(title, subTitle, '在职', values)
        case 'bar':
            itemList.forEach(i => {
                keys.push(i.itemTitle)
                values.push(i.itemCount)
            })
            return setBarOption(keys, values)
    }
}
export function getOSexOption() {
    const sexSrc = {male: 0, female: 0}
    const sex = [{name: '男性', value: sexSrc.male}, {name: '女性', value: sexSrc.female}]
    return setPieOption('性别比例', '新增职工', '新增', sex)
}
export function getOAgeOption() {
    const ageSrc = [0, 0, 0, 0, 0]
    const ageData = ['<30', '30-40', '40-50', '50以上', '未知']
    return setBarOption(ageData, ageSrc)
}
export function getOEduOption() {
    let eduData = ['小学', '初中', '高中', '本科', '未知']
    let eduSrc = [0, 0, 0, 0, 0]
    return setBarOption(eduData, eduSrc)
}
export function getOProOption() {
    let proData = ['初级', '中级', '高级', '未知']
    let proSrc = [0, 0, 0, 0]
    return setBarOption(proData, proSrc)
}
export function getMarriage() {
    const sexSrc = {male: 0, female: 0}
    const sex = [{name: '已婚', value: sexSrc.male}, {name: '未婚', value: sexSrc.female}]
    return setPieOption('婚姻', '', '就职职工', sex)
}
