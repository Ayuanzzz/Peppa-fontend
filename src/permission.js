import router from './router'
import { getUser } from './utils/auth'
import { asyncRoutes } from '@/router';
import { filterAsyncRoutes } from '@/utils/router';

let load = 0
router.beforeEach((to, from) => {
    if (!getUser() && to.path !== '/login') {
        return { path: 'login' }
    } else if (load === 0 && to.path !== '/login') {
        load++;
        const accessRoutes = filterAsyncRoutes(asyncRoutes, getUser().roles)
        accessRoutes.forEach(route => {
            router.addRoute(route)
        });
        return { path: to.fullPath }
    }
})