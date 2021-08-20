import {$} from '@/service/index'

const prefix = process.env.VUE_APP_HRMS_PREFIX
const module = '/hrEmpImportRecord'

export const api = {
    importUrl: `${prefix}${module}/import`,
    downloadTemUrl: `${prefix}${module}/downloadTemplate`,
    downloadEmpImportRecordUrl: `${prefix}${module}/downloadEmpImportRecord`
}

export function importData(data){
    return $.post(
        api.importUrl,
        {
            body: data
        }
    )
}

export function downTemp() {
    const user = JSON.parse(localStorage.getItem('HRMS_USER')??'{}')
    return $.get(
        api.downloadTemUrl,
        {
            params: {
                companyId: user.companyId
            }
        }
    )
}

export function downReport() {
    const user = JSON.parse(localStorage.getItem('HRMS_USER')??'{}')
    return $.get(
        api.downloadEmpImportRecordUrl,
        {
            params: {
                companyId: user.companyId
            }
        }
    )
}
