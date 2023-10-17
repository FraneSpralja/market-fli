<template>
    <nav-bar></nav-bar>

    <div class="container-fluid">
        <h1 class="main-title">portada inicial del market</h1>
        <div class="row">

            <div class="col-12">
                <auction 
                @show-modal="carouselModal"
                />
            </div>

            <div class="col-12">
                <router-view v-slot="{ Component }">
                    <component :is="Component" :carouselModal="modal"/>
                </router-view>
            </div>

        </div>
    </div>
</template>

<script>
    import { useStore } from 'vuex'

    import navBar from '../components/nav-bar'
    import auction from '../components/featured-auction'
    import categoryList from '../components/category-list';
    import { ref } from 'vue';


    export default {
        components: {
            navBar,
            auction,
            categoryList
        },
        setup() {
            const store = useStore()
            const modal = ref()

            const products = () => {
                store.dispatch('market/getProducts')
            }

            const getFeaturedProducts = () => {
                setTimeout(() => {

                }, 500)
                store.dispatch('market/getRandomProducts')
            }

            products()
            getFeaturedProducts()

            return {
                modal,
                carouselModal: (e) => {
                    modal.value = e
                }
            }
        }
    }
</script>