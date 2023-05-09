import router from './router'
import { getUser } from './utils/auth'
import { asyncRoutes } from '@/router';
import { filterAsyncRoutes } from '@/utils/router';

const whiteList = ['/login', '/register']

let load = 0
router.beforeEach((to, from, next) => {
    if (getUser()) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            if (load === 0) {
                load++;
                const accessRoutes = filterAsyncRoutes(asyncRoutes, getUser().roles)
                accessRoutes.forEach(route => {
                    router.addRoute(route)
                });
                next({ path: '/' })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.fullPath}`)
        }
    }
})

//hack to add routes
router.beforeEach((to, from) => {
    if (to.path === '/login') {
        load = 0
    }
})