export function exchangeEleFromArray(array, startIndex, direction) {
    array.splice(startIndex, 1, ...array.splice(startIndex + direction, 1, array[startIndex]))
}

/**
 * 查找对应的子项，值返回找到的第一个
 *
 * @param array 树形数组
 * @param keyName 关键字的名字
 * @param keyValue 关键字的值
 * @returns {null}
 */
export function retrieveSubItemByKey(array, keyName, keyValue) {
    let meetResult = null
    array.forEach(a => {
        if (keyValue === a?.[keyName] || a?.[keyName].toString().includes(keyValue.toString())) {
            meetResult = a
        } else {
            const result = a?.children && retrieveSubItemByKey(a.children, keyName, keyValue)
            if (result) {
                meetResult = result
            }
        }
    })
    return meetResult
}

export function retrieveSubItemsByKey(array, keyName, keyValue) {
    let results = []
    if (keyValue && keyValue.toString().length > 0) {
        array.forEach(a => {
            if (keyValue === a?.[keyName] || a?.[keyName].toString().includes(keyValue.toString())) {
                results.push(a)
            } else {
                const children = a?.children && retrieveSubItemsByKey(a.children, keyName, keyValue)
                if (children) {
                    results.push(...children)
                }
            }
        })
    }
    return results
}
