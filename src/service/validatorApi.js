import {$} from '@/service/index'
import {generateRules} from "@/funcLib/validator";

const prefix = '/base'

export const api = {
    validUrl: `${prefix}/form/validator`,
}

export function validateWithFullPath(url) {
    return new Promise((resolve, reject) => {
        const saveUrl = url.substring(url.indexOf('/', 2))
        $.post(
            `${api.validUrl}/${saveUrl}`,
        ).then(res => {
            const {isSuccess, data, msg} = res
            if (isSuccess) {
                resolve(generateRules(data))
            } else {
                reject(msg)
            }
        })
    })
}
