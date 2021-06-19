export function exchangeEleFromArray(array, startIndex, direction) {
    array.splice(startIndex, 1, ...array.splice(startIndex+direction, 1, array[startIndex]))
}
