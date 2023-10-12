export default {
    name: 'user',
    component: () => import(/* webpackChunkName user */ '@/modules/user/layout/user-layout.vue'),
    children: [
        {
            path: '',
            name: 'user-form',
            component: () => import(/* webpackChunkName user-form */ '@/modules/user/components/user-form.vue')
        }
    ]
}