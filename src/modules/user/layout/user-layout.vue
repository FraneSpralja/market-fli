<template>
    <nav-bar />
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
import navBar from '@/modules/user/components/nav-bar'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
    components: {
        navBar
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        
        const id = route.params.id
        const getMyProducts = () => store.dispatch('user/getMyProducts', id)

        getMyProducts()
    }
}
</script>