import xlsx from "xlsx";

const requiredCol = [
    '部门', '姓名', '身份证号', '手机号', '民族', '政治面貌', '婚姻状况', '用工来源', '职工类型', '行政归属', '干部级别',
    '职工状态', '到本单位时间', '参加工作时间', '工龄', '最高学历', '学历', '毕业时间', '毕业院校', '专业', '专业技术职务',
    '职称专业', '职称类别', '职称级别'
]

export function readExcel(file){
    let workbook = xlsx.read(file, { type: 'array'})
    let sheets = workbook.Sheets
    const colReg = /4$/
    const initValRowIndex = 5
    const colRequiredMap = {}
    const columns = []
    let valWrapper = {}
    let valArray = []
    for (const sheetsKey in sheets) {
        for (const subKey in sheets[sheetsKey]) {
            if (colReg.test(subKey)) {
                const key = sheets[sheetsKey][subKey]?.v
                const isRequired = requiredCol.includes(key)
                colRequiredMap[key] = isRequired
                columns.push({
                    key: key,
                    title: key,
                    dataIndex: key,
                    width: 200,
                    ellipsis: true,
                    slots: { customRender: key },
                })
            }
            const trailNum = parseTrailNum(subKey)
            if(trailNum && trailNum >= initValRowIndex) {
                const preCellName = parsePreCellName(subKey)
                const cellTitle = sheets[sheetsKey][preCellName.concat('4')]?.v
                const cellName = preCellName.concat(trailNum)
                const cellValue = sheets[sheetsKey][cellName]?.v

                const currentArrayIndex = trailNum - initValRowIndex
                if (!valWrapper[currentArrayIndex]) {
                    valWrapper[currentArrayIndex] = {
                        key: currentArrayIndex
                    }
                }
                valWrapper[currentArrayIndex][cellTitle] = cellValue
            }
        }
    }
    const colLength = columns.length
    for (const valWrapperKey in valWrapper) {
        let row = {}
        for (let i = 0; i < colLength; i++) {
            const key = columns[i].key
            const value = valWrapper[valWrapperKey][key]?? null
            row[key] = value
        }
        row.key=valWrapperKey + 1
        valArray.push(row)
    }
    return { columns: columns, data: valArray, colRequired: colRequiredMap}
}

function parseTrailNum(key) {
    const refReg = /\d+/
    const execResult = refReg.exec(key)?.[0]
    return execResult ? Number(execResult) : null
}

function parsePreCellName(key) {
    const reg = /\D+/
    const execResult = reg.exec(key)?.[0]
    return execResult ? execResult : null
}
