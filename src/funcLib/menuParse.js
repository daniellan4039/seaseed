import {getRouter} from "@/service/anyoneApi";

export function generateMenu(routes) {
    return routes.map((r, k) => {
        if (false === r.meta.visible ?? false) {
            return null
        }
        const menu = {
            title: r.meta?.title ?? 'X',
            type: r.meta?.type ?? 'menuItem',
            key: r.meta.key ?? k,
            path: r.path
        }
        const children = generateMenu(r.children ?? [])
        children.length > 0 && (menu.children = children)
        return menu
    })
}

export async function getFromBasePlatform() {
    const {isSuccess, data, msg} = await getRouter()
    if (isSuccess) {
        console.log(data, msg)
    }
}

export const staticMenu = [
    {
        title: '首页',
        type: 'menuItem',
        key: 'home',
        path: '/home',
        meta: {}
    },
    {
        title: '统计看板',
        type: 'menuItem',
        key: 'statistic',
        path: '/statistic',
        meta: {}
    },
    {
        title: '职工管理',
        type: 'subMenu',
        key: 'employeeManage',
        path: '/employeeManage',
        meta: {},
        children: [
            {
                title: '全部职工',
                type: 'menuItem',
                key: 'employee',
                path: '/employee',
                meta: {}
            },
            {
                title: '试用期职工',
                type: 'menuItem',
                key: 'employee',
                path: '/employee',
                meta: {}
            },
            {
                title: '离退休职工',
                type: 'menuItem',
                key: 'employee',
                path: '/employee',
                meta: {}
            },
            {
                title: '解除合同职工',
                type: 'menuItem',
                key: 'employee',
                path: '/employee',
                meta: {}
            },
            {
                title: '借调职工',
                type: 'menuItem',
                key: 'employee',
                path: '/employee',
                meta: {}
            },
            {
                title: '外派职工',
                type: 'menuItem',
                key: 'employee',
                path: '/employee',
                meta: {}
            },
            {
                title: '调出职工',
                type: 'menuItem',
                key: 'employee',
                path: '/employee',
                meta: {}
            },
        ]
    },
    {
        title: '职工信息查询',
        type: 'subMenu',
        key: '/employeeInfo',
        path: '//employeeInfo',
        meta: {},
        children: [
            {
                title: '职工证书',
                type: 'menuItem',
                key: 'certification',
                path: '/certification',
                meta: {}
            },
            {
                title: '职工职称',
                type: 'menuItem',
                key: 'professional',
                path: '/professional',
                meta: {}
            },
            {
                title: '职工家庭',
                type: 'menuItem',
                key: 'family',
                path: '/family',
                meta: {}
            },
            {
                title: '职工学历',
                type: 'menuItem',
                key: 'education',
                path: '/education',
                meta: {}
            },
            {
                title: '复转军人',
                type: 'menuItem',
                key: 'soldier',
                path: '/soldier',
                meta: {}
            },
            {
                title: '职工合同',
                type: 'menuItem',
                key: 'contract',
                path: '/contract',
                meta: {}
            },
            {
                title: '职工专利',
                type: 'menuItem',
                key: 'petent',
                path: '/petent',
                meta: {}
            },
            {
                title: '职工语言',
                type: 'menuItem',
                key: 'language',
                path: '/language',
                meta: {}
            },
        ]
    },
    {
        title: '档案管理',
        type: 'subMenu',
        key: 'archiveManage',
        path: '/archiveManage',
        meta: {}
    },
    {
        title: '基础管理',
        type: 'subMenu',
        key: 'baseManage',
        path: '/baseManage',
        meta: {}
    },

]
