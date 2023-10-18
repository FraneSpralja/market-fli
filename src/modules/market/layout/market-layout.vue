<template>
    <nav-bar></nav-bar>

    <div class="container">
        <h1 class="main-title">portada inicial del market</h1>
        <div class="row">

            <div class="col-12">
                <auction 
                @show-modal="showModal"
                />
            </div>

            <div class="col-12">
                <router-view
                :itemModal="modalItem"
                ></router-view>
            </div>

        </div>
    </div>
</template>

<script>
    import { useStore } from 'vuex'
    import { ref } from 'vue'

    import navBar from '../components/nav-bar'
    import auction from '../components/featured-auction'


    export default {
        components: {
            navBar,
            auction
        },
        setup() {
            const store = useStore()
            const modalItem = ref(null)
            
            const products = () => {
                store.dispatch('market/getProducts')
            }

            const getFeaturedProducts = () => {
                store.dispatch('market/getRandomProducts')
            }

            products()
            getFeaturedProducts()

            return {
                modalItem,
                showModal: (item) => modalItem.value = item
            }

        }
    }
</script>