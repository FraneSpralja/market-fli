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
            component: () => import(/* webpackChunkName user-view */ '@/modules/user/view/user-profile.vue'),
        },
        {
            path: 'my-product/user_:id',
            name: 'my-product',
            component: () => import(/* webpackChunkName user-product */ '@/modules/user/view/user-add-products.vue')
        }
    ]
}