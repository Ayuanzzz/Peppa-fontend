import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/layout/index.vue'

export const constantRoutes = [
    {
        path: '/',
        redirect: '/register',
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
                path: '/project',
                name: 'project',
                component: () => import('@/views/dashboard/index.vue'),
                meta: { title: '首页', icon: 'SuitcaseLine' }
            }
        ]
    },

]

export const asyncRoutes = [
    {
        path: '/done',
        component: Layout,
        meta: { roles: ['user'] },
        children: [
            {
                path: '',
                name: 'done',
                component: () => import('@/views/done/index.vue'),
                meta: { title: '已完成', roles: ['user'] }
            }
        ]
    },
    {
        path: '/project',
        component: Layout,
        meta: { roles: ['admin'] },
        children: [
            {
                path: '/project',
                name: 'project',
                component: () => import('@/views/project/index.vue'),
                meta: { title: '项目管理', roles: ['admin'], icon: 'SuitcaseLine' }
            }
        ]
    },
    {
        path: '/employee',
        component: Layout,
        meta: { roles: ['admin'] },
        children: [
            {
                path: '',
                name: 'employee',
                component: () => import('@/views/employee/index.vue'),
                meta: { title: '员工管理', roles: ['admin'], icon: 'User' }
            }
        ]
    },
    {
        path: '/doing',
        component: Layout,
        meta: { roles: ['user'] },
        children: [
            {
                path: '',
                name: 'doing',
                component: () => import('@/views/doing/index.vue'),
                meta: { title: '当前任务', roles: ['user'], icon: 'IconDocument' }
            }
        ]
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})


export default router