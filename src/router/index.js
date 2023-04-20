import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/layout/index.vue'

export const constantRoutes = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/register',
        component: () => import('@/views/register/index.vue')
    },
    {
        path: '/dashboard',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                meta: { title: '首页' }
            }
        ]

    },
]

export const asyncRoutes = [
    // {
    //     path: '/project',
    //     component: Layout,
    //     meta: { roles: ['admin'] },
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'project',
    //             component: () => import('@/views/project/index.vue'),
    //             meta: { title: '项目管理', roles: ['admin'] }
    //         }
    //     ]

    // },
    // {
    //     path: '/doing',
    //     component: Layout,
    //     meta: { roles: ['user'] },
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'doing',
    //             component: () => import('@/views/doing/index.vue'),
    //             meta: { title: '当前任务' }
    //         }
    //     ]

    // },
    {
        path: '/project',
        component: () => import('@/views/project/index.vue'),
        meta: { title: '项目管理', roles: ['admin'] }
    },
    {
        path: '/doing',
        component: () => import('@/views/doing/index.vue'),
        meta: { roles: ['user'] },
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})


export default router