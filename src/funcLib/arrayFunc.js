export function exchangeEleFromArray(array, startIndex, direction) {
    array.splice(startIndex, 1, ...array.splice(startIndex+direction, 1, array[startIndex]))
}

export function retrieveSubItemByKey(array, keyName, keyValue){
    let meetResult = {}
    array.find(a => {
        if (a[keyName] === keyValue) {
            meetResult = a
            return true
        } else {
            const result = a.children && retrieveSubItemByKey(a.children, keyName, keyValue)
            if (result) {
                meetResult = result
                return true
            }
        }
    })
    return meetResult
}
