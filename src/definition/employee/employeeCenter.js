export const tableDef = {
    key: 'employeeCenter',
    size: 'small',
    bordered: false,
    rowKey: 'employeeCenter',
    title: '职工中心',
    url: 'test url',
    columns: [
        {
            title: '职工编号',
            dataIndex: 'employeeNo',
            width: 100,
            scopedSlots: { customRender: 'ellipsisCustom' }
        },
        {
            title: '职工姓名',
            dataIndex: 'realName',
            scopedSlots: { customRender: 'ellipsisCustom' },
            width: 120
        },
        {
            title: '证件号码',
            dataIndex: 'certificationId',
            scopedSlots: { customRender: 'ellipsisCustom' },
            width: 170
        },
        {
            title: '所属组织',
            dataIndex: 'companyId',
            scopedSlots: { customRender: 'companyId' },
            width: 280
        },
        {
            title: '所属部门',
            dataIndex: 'departmentId',
            scopedSlots: { customRender: 'departmentId' },
            width: 170
        },
        {
            title: '职位',
            dataIndex: 'positionId',
            scopedSlots: { customRender: 'positionId' },
            width: 120
        },
        {
            title: '联系电话',
            dataIndex: 'telNum',
            width: 120,
            scopedSlots: { customRender: 'ellipsisCustom' }
        },
        {
            title: '职工状态',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' },
            width: 90
        },
        {
            title: '创建时间',
            width: 160,
            dataIndex: 'createTime',
            scopedSlots: { customRender: 'ellipsisCustom' }
        },
        {
            title: '操作',
            dataIndex: 'action',
            width: 110,
            fixed: 'right',
            scopedSlots: { customRender: 'action' }
        }
    ]
}
