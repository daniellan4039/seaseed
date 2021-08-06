import {getByCode} from "@/service/dictionaryApi";

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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
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

