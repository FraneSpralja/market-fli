<template>
    <nav-bar
    :isActive="userIsActive"
    ></nav-bar>

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
                v-slot="{ Component }"
                >
                    <component :is="Component" :itemModal="product"></component>
                </router-view>
            </div>

        </div>
    </div>
</template>

<script>
    import { carousel } from '@/helpers/carousel';
    import { useStore } from 'vuex'

    import navBar from '../components/nav-bar'
    import auction from '../components/featured-auction'
    import categoryList from '../components/category-list';
    import { computed, onMounted, ref } from 'vue';

    export default {
        components: {
            navBar,
            auction,
            categoryList
        },
        setup() {
            const store = useStore()
            const product = ref()

            const userIsActive = computed(() => store.getters['user/isActive'])
            const log_user = computed(() => store.getters['user/getUser'])

            const auctionCarousel = () => {
                setTimeout(() => {
                    const container = document.querySelector('.featured-auction__row')
                    const btns = document.querySelectorAll('.featured-auction__navigation-bullets')
                    const cards = document.querySelectorAll('.featured-auction__card')

                    carousel(container,btns, cards)

                }, 500)
            }
            
            const products = async () => {
                await store.dispatch('market/getProducts')
                await store.dispatch('market/getRandomProducts')
                auctionCarousel()
            }

            products()

            onMounted(() => {
                store.dispatch('user/activeUser')
                store.dispatch('user/getUserLikes', log_user.id)
            })

            return {
                product,
                userIsActive,
                showModal: (e) => {
                    product.value = { ...e }
                }
            }

        }
    }
</script>