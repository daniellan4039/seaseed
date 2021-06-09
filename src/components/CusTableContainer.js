// eslint-disable-next-line no-unused-vars
import {h} from "vue";

export default {
    name: 'CusTableContainer',
    render() {
        return h(
            <div className="cus-table-container"></div>,
            null,
            {
                default: () => {
                    const header = h(
                        <div className='search-block'>header</div>
                    )
                    return [
                        header, this.$slots.default()
                    ]
                }
            }
        )
    }
}
