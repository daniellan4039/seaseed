import {api, getRouter} from "@/service/anyoneApi";
import store from '@/store/index'
import router from "@/router";
import {$} from "@/service";
import {Modal} from "ant-design-vue";

export function generateMenuByRoutes(routes) {
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
        const children = generateMenuByRoutes(r.children ?? [])
        children.length > 0 && (menu.children = children)
        return menu
    })
}

export function generateMenuFromRawRoute(routes) {
    return routes.map(r => {
        let menu = {}
        const children = r?.children?.find(ri => {
            return ri.meta.type === '0'
        })
        if (children) {
            menu.type = 'subMenu'
            const menuChildren = generateMenuFromRawRoute(r.children)
            menu.children = menuChildren
        } else if(r.meta.type === '0'){
            menu.type = 'menuItem'
        } else {
            return null
        }
        menu.title = r.name
        menu.key = r.code
        menu.path = r.path
        menu.meta = { checked: false, icon: r.meta.icon, color: r.meta?.color??'#7D79F6' }
        return menu
    })
}

export function getMenuFromBasePlatform(currentUrl) {
    return new Promise((resolve) => {
        getRouter().then(res => {
            const {isSuccess, data} = res
            if (isSuccess) {
                let routeMap = {}
                data.forEach(d => {
                    routeMap[d.code] = d.name
                })
                store.dispatch('setRouteMap', routeMap)
                store.dispatch('setRoute', data)
                // 跳转至首页
                currentUrl ? (window.loaction = currentUrl) : this.$router.push({ path: '/' })
                resolve(data)
            } else {
                return resolve([])
            }
        })
    })
}

export function getTokenByTicket() {
    const ticket = router.params?.ticket
    const currentUrl = router.params?.current
    if (ticket == null && currentUrl == null) {
        getMenuFromBasePlatform()
        return Promise.reject('HRMS: not obtain valid ticket!')
    }
    const formData = new FormData()
    formData.append('ticket', ticket)
    return new Promise((resolve, reject) => {
        $.post(
            api.getTokenByTicketUrl,
            formData
        ).then(res => {
            const {isSuccess, data, msg} = res
            if (isSuccess) {
                localStorage.setItem('HRMS_USER', data)
                localStorage.setItem('HRMS_USER_TOKEN', data.token)
                getMenuFromBasePlatform(currentUrl)
                resolve()
            } else {
                reject(msg)
            }
        })
    })
}

export function jumpToAuth (msg = '须重新登录，登录后是否留在当前页面？') {
    const redirectUrl = encodeURIComponent(`${process.env.VUE_APP_AUTH_LOGIN}/\${ticket}`)
    const jumpUrl = `${process.env.VUE_APP_AUTH_HOST}/pjcp-web-workbench/#/login?bizPath=${redirectUrl}`
    Modal.confirm({
        content: msg,
        onOk () {
            window.location = jumpUrl
            console.log('OK!')
        },
        onCancel () {}
    })
}

export function warningUserForbidden (msg = '您在该公司的账号被禁用，请联系公司管理员') {
    const jumpUrl = `${process.env.VUE_APP_AUTH_HOST}/pjcp-web-workbench/#/login?`
    Modal.warning({
        content: msg,
        okText: '关闭',
        onOk: () => {
            window.location = jumpUrl
        }
    })
}

export function backWorkBentch (msg = '返回工作台？') {
    const jumpUrl = `${process.env.VUE_APP_AUTH_HOST}/pjcp-web-workbench/#/`
    Modal.confirm({
        content: msg,
        onOk () {
            window.location = jumpUrl
        },
        onCancel () {}
    })
}


