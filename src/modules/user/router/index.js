export default {
    name: 'user',
    component: () => import(/* webpackChunkName user */ '@/modules/user/layout/user-layout.vue'),
    children: [
        {
            path: '',
            name: 'user-form',
            component: () => import(/* webpackChunkName user-form */ '@/modules/user/components/user-form.vue')
        },
        {
            path: 'user_:id',
            name: 'user-profile',
            component: () => import(/* webpackChunkName user-view */ '@/modules/user/view/user-profile.vue')
        }
    ]
}