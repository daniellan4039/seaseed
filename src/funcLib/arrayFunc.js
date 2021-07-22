export function exchangeEleFromArray(array, startIndex, direction) {
    array.splice(startIndex, 1, ...array.splice(startIndex + direction, 1, array[startIndex]))
}

/**
 * 查找对应的子项，返回找到的第一个
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

/**
 * 转换一个树到另一个树
 *
 * @param tree 源树数据数组
 * @param callBack 子项处理回调函数，用于构建新的树的子项
 */
export function convertTreeToTree(tree, callBack) {
    return tree.map(t => {
        const item = callBack(t)
        if (t.children && t.children.length) {
            const children = convertTreeToTree(t.children, callBack)
            item.children = children
        }
        return item
    })
}

/**
 * 将一个数组转换成树
 *
 * @param list 具有parentId指向属性的数组
 * @param configCurrentNodeCallback 当前组装父子关系的回调函数，如果为空，则使用默认的父子级关系进行组合，否则由用户自定义组合
 * @returns {{}|*[]}
 */
export function convertArrayToTree(list, configCurrentNodeCallback, parentKey='parentId', currentKey='id', childrenKey='children') {
    let map = {};
    let node;
    let roots = [];
    let i;
    if (!list) {
        return map;
    }

    for (i = 0; i < list.length; i += 1) {
        map[list[i][currentKey]] = i; // initialize the map
        list[i][childrenKey] = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node[parentKey] !== '0') {
            // if you have dangling branches check that map[node.parentId] exists
            if(configCurrentNodeCallback) {
                configCurrentNodeCallback(list[map[node[parentKey]]], node)
            } else {
                list[map[node[parentKey]]][childrenKey].push(node)
            }
        } else {
            roots.push(node);
        }
    }
    return roots;
}
