export function generateRules(data = []) {
    let rules = {}
    data.forEach(r => {
        rules[r.fieldName] = []
        r.constraints.forEach(c => {
            const constrain = {}
            switch (c.type) {
                case 'NotNull': {
                    constrain['required'] = true
                    constrain['message'] = c.attrs.message
                    constrain['trigger'] = 'blur'
                    break
                }
                case 'Range': {
                    for (const attr in c.attrs) {
                        constrain[attr] = c.attrs[attr]
                    }
                    break
                }
                case 'Min': {
                    // constrain['validator'] = this.validateMinValue
                    // for (const attr in c.attrs) {
                    //     constrain[attr] = c.attrs[attr]
                    // }
                    break
                }
                case 'Max': {
                    // constrain['validator'] = this.validateMaxValue
                    // for (const attr in c.attrs) {
                    //     constrain[attr] = c.attrs[attr]
                    // }
                    break
                }
            }
            rules[r.fieldName].push(constrain)
        })
    })
    return rules
}
