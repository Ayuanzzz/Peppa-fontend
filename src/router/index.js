import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/layout/index.vue'

export const constantRoutes = [
    {
        path: '/',
        redirect: '/dashboard',
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
    //     path: '/assigingProjects',
    //     name: 'assigingProjects',
    //     component: Layout,
    //     children: [
    //         {
    //             path: '',
    //             component: () => import('@/views/assigingProjects/index.vue'),
    //         }
    //     ]
    // }
]
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})
console.log(router);


export default router