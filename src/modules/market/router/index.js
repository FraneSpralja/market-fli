export default {
    name: 'market',
    component: () => import(/* webpackChunkName market */ '@/modules/market/layout/market-layout.vue'),
    children: [
        {
            path: '',
            name: 'category-list',
            component: () => import(/* webpackChunkName category-list */ '@/modules/market/components/category-list.vue')
        },
        {
            path: '/product/:id',
            name: 'product-view',
            component: () => import( /* webpackChunkName */ '@/modules/market/view/product-view.vue'),
            props: ( route ) => {
                return {
                    id: route.params.id
                }
            }
        }
    ]
}