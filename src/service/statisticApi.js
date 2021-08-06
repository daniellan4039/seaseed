import {$} from '@/service/index'

const prefix = process.env.VUE_APP_HRMS_PREFIX
const module = '/statistics'

export const api = {
    variationUrl: `${prefix}${module}/getVariation`,
    statisticUrl: `${prefix}${module}/employee`,
}

export function getVariation(from, to, companyId, departId){
    return $.get(
        api.variationUrl,
        {
            params: {
                from: from,
                to: to,
                companyId: companyId,
                departId: departId
            }
        }
    )
}

// eslint-disable-next-line no-unused-vars
export function getEmployeeInfo(codes = '*', companyId, departId) {
    return $.post(
        api.statisticUrl,
        {
            companyId: companyId,
            departmentId: departId,
            type: codes,
            getChild: false
        }
    )
}


