<template>
    <nav-bar></nav-bar>

    <div class="container-fluid">
        <h1 class="main-title">portada inicial del market</h1>
        <div class="row">

            <div class="col-12">
                <auction />
            </div>

            <div class="col-12">
                <router-view></router-view>
            </div>

        </div>
    </div>
</template>

<script>
    import { useStore } from 'vuex'

    import navBar from '../components/nav-bar'
    import auction from '../components/featured-auction'


    export default {
        components: {
            navBar,
            auction
        },
        setup() {
            const store = useStore()
            
            const products = () => {
                store.dispatch('market/getProducts')
            }

            const getFeaturedProducts = () => {
                store.dispatch('market/getRandomProducts')
            }

            products()
            getFeaturedProducts()

        }
    }
</script>